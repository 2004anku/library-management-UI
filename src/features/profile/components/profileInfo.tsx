"use client";

import { useProfile } from "../hooks/useprofile";

export default function ProfileInfo() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border)]">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8">
      <h2 className="text-2xl font-bold mb-8">Personal Information</h2>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Full Name</p>

          <p className="font-semibold">{profile.fullName}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Email</p>

          <p className="font-semibold">{profile.email}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Phone</p>

          <p className="font-semibold">{profile.phone || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Gender</p>

          <p className="font-semibold capitalize">{profile.gender || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Role</p>

          <p className="font-semibold capitalize">{profile.role}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Account Status</p>

          <p
            className={`font-semibold ${
              profile.isActive ? "text-green-500" : "text-red-500"
            }`}
          >
            {profile.isActive ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      <hr className="my-8 border-[var(--border)]" />

      <h2 className="text-2xl font-bold mb-8">College Information</h2>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Name</p>

          <p className="font-semibold">{profile.collegeId.collegeName}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Code</p>

          <p className="font-semibold">{profile.collegeId.collegeCode}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Email</p>

          <p className="font-semibold">{profile.collegeId.email}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Phone</p>

          <p className="font-semibold">{profile.collegeId.phone}</p>
        </div>
      </div>

      <hr className="my-8 border-[var(--border)]" />

      <h2 className="text-2xl font-bold mb-8">Library Information</h2>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Library Name</p>

          <p className="font-semibold">{profile.libraryId.libraryName}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Library Email</p>

          <p className="font-semibold">{profile.libraryId.email}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Library Phone</p>

          <p className="font-semibold">{profile.libraryId.phone}</p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Working Hours</p>

          <p className="font-semibold">
            {profile.libraryId.workingHours.open} -{" "}
            {profile.libraryId.workingHours.close}
          </p>
        </div>
      </div>
    </div>
  );
}
