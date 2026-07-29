"use client";

import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

import Button from "@/components/ui/button/Button";

import { Profile } from "../types/profileType";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

type Props = {
  profile: Profile;
  onClose: () => void;
};

export default function EditProfileModal({ profile, onClose }: Props) {
  const updateProfileMutation = useUpdateProfile();

  const modalRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    gender: "" as "" | "male" | "female" | "other",
  });

  useEffect(() => {
    setFormData({
      fullName: profile.fullName,
      phone: profile.phone || "",
      gender: profile.gender || "",
    });
  }, [profile]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const validate = () => {
    console.log("Phone Value:", formData.phone);

    const newErrors = {
      fullName: "",
      phone: "",
    };

    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must contain at least 2 characters.";
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    setErrors(newErrors);

    return !newErrors.fullName && !newErrors.phone;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const nothingChanged =
      formData.fullName === profile.fullName &&
      formData.phone === (profile.phone || "") &&
      formData.gender === (profile.gender || "");

    if (nothingChanged) {
      onClose();
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({
        fullName: formData.fullName,
        phone: formData.phone ? `+91${formData.phone}` : undefined,
        gender: formData.gender === "" ? undefined : formData.gender,
      });

      onClose();
    } catch {}
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Update your personal information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          {/* Full Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
              Full Name
            </label>

            <input
              autoFocus
              name="fullName"
              disabled={updateProfileMutation.isPending}
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-main)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            />

            {errors.fullName && (
              <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
              Email Address
            </label>

            <input
              disabled
              value={profile.email}
              className="w-full cursor-not-allowed rounded-xl border border-[var(--border)] bg-slate-800 px-4 py-3 opacity-70"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
              Phone Number
            </label>

            <div className="flex overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-main)] focus-within:border-[var(--primary)]">
              <div className="flex items-center border-r border-[var(--border)] px-4 text-[var(--text-secondary)]">
                +91
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                placeholder="9876543210"
                className="w-full bg-transparent px-4 py-3 outline-none"
              />
            </div>

            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Gender */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
              Gender
            </label>

            <select
              name="gender"
              disabled={updateProfileMutation.isPending}
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-main)] px-4 py-3 outline-none focus:border-[var(--primary)]"
            >
              <option
                value=""
                className="bg-[var(--bg-card)] text-[var(--text-primary)]"
              >
                Select Gender
              </option>
              <option
                value="male"
                className="bg-[var(--bg-card)] text-[var(--text-primary)]"
              >
                Male
              </option>
              <option
                value="female"
                className="bg-[var(--bg-card)] text-[var(--text-primary)]"
              >
                Female
              </option>
              <option
                value="other"
                className="bg-[var(--bg-card)] text-[var(--text-primary)]"
              >
                Other
              </option>
            </select>
          </div>

          {/* Read Only */}

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-[var(--bg-main)] p-4">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">College</p>

              <p className="font-medium">{profile.collegeId.collegeName}</p>
            </div>

            <div>
              <p className="text-xs text-[var(--text-secondary)]">Library</p>

              <p className="font-medium">{profile.libraryId.libraryName}</p>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-[var(--border)] px-6 py-5">
          <button
            disabled={updateProfileMutation.isPending}
            onClick={onClose}
            className="rounded-xl border border-[var(--border)] px-5 py-2 transition hover:bg-slate-800 disabled:opacity-50"
          >
            Cancel
          </button>

          <Button
            loading={updateProfileMutation.isPending}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
