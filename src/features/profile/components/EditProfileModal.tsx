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

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    gender: "" as "" | "male" | "female" | "other",
  });

  // ---------------------------------------
  // LOAD PROFILE DATA
  // ---------------------------------------

  useEffect(() => {
    setFormData({
      fullName: profile.fullName,
      phone: profile.phone || "",
      gender: profile.gender || "",
    });
  }, [profile]);

  // ---------------------------------------
  // ESCAPE KEY
  // ---------------------------------------

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // ---------------------------------------
  // VALIDATION
  // ---------------------------------------

  const validate = () => {
    const newErrors = {
      fullName: "",
      phone: "",
    };

    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must contain at least 2 characters.";
    }

    if (formData.phone) {
      const e164Regex = /^\+[1-9]\d{7,14}$/;

      if (!e164Regex.test(formData.phone)) {
        newErrors.phone =
          "Enter a valid international number, e.g. +919876543210.";
      }
    }

    setErrors(newErrors);

    return !newErrors.fullName && !newErrors.phone;
  };

  // ---------------------------------------
  // HANDLE INPUT CHANGE
  // ---------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear phone error while typing
    if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }

    // Clear name error while typing
    if (name === "fullName") {
      setErrors((prev) => ({
        ...prev,
        fullName: "",
      }));
    }
  };

  // ---------------------------------------
  // SUBMIT
  // ---------------------------------------

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
        fullName: formData.fullName.trim(),

        // Store exactly as E.164
        phone: formData.phone || undefined,

        gender: formData.gender === "" ? undefined : formData.gender,
      });

      onClose();
    } catch {}
  };

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className="
        w-full
        max-w-lg
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--bg-card)]
        shadow-2xl
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--border)]
          px-6
          py-5
        "
      >
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Edit Profile
          </h2>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Update your personal information.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            rounded-lg
            p-2
            text-[var(--text-secondary)]
            transition
            hover:bg-slate-700
            hover:text-white
          "
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        {/* Full Name */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[var(--text-secondary)]
            "
          >
            Full Name
          </label>

          <input
            autoFocus
            name="fullName"
            disabled={updateProfileMutation.isPending}
            value={formData.fullName}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--bg-main)]
              px-4
              py-3
              text-[var(--text-primary)]
              outline-none
              transition
              focus:border-[var(--primary)]
            "
          />

          {errors.fullName && (
            <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[var(--text-secondary)]
            "
          >
            Email Address
          </label>

          <input
            disabled
            value={profile.email}
            className="
              w-full
              cursor-not-allowed
              rounded-xl
              border
              border-[var(--border)]
              bg-slate-800
              px-4
              py-3
              text-[var(--text-primary)]
              opacity-70
            "
          />
        </div>

        {/* Phone */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[var(--text-secondary)]
            "
          >
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={updateProfileMutation.isPending}
            placeholder="+919876543210"
            className="
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--bg-main)]
              px-4
              py-3
              text-[var(--text-primary)]
              outline-none
              transition
              focus:border-[var(--primary)]
            "
          />

          <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
            Include the country code, for example +919876543210.
          </p>

          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Gender */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[var(--text-secondary)]
            "
          >
            Gender
          </label>

          <select
            name="gender"
            disabled={updateProfileMutation.isPending}
            value={formData.gender}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--bg-main)]
              px-4
              py-3
              text-[var(--text-primary)]
              outline-none
              focus:border-[var(--primary)]
            "
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Read Only Information */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            rounded-xl
            bg-[var(--bg-main)]
            p-4
          "
        >
          <div>
            <p className="text-xs text-[var(--text-secondary)]">College</p>

            <p className="font-medium text-[var(--text-primary)]">
              {profile.collegeId.collegeName}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--text-secondary)]">Library</p>

            <p className="font-medium text-[var(--text-primary)]">
              {profile.libraryId.libraryName}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div
        className="
          flex
          justify-end
          gap-3
          border-t
          border-[var(--border)]
          px-6
          py-5
        "
      >
        <button
          type="button"
          disabled={updateProfileMutation.isPending}
          onClick={onClose}
          className="
            rounded-xl
            border
            border-[var(--border)]
            px-5
            py-2
            text-[var(--text-primary)]
            transition
            hover:bg-slate-800
            disabled:opacity-50
          "
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
  );
}
