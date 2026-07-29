"use client";

import { useProfile } from "../hooks/useProfile";

export default function PersonalInfoCard() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
      <h2 className="mb-8 text-2xl font-bold text-[var(--text-primary)]">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Full Name</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.fullName}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Email Address</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Phone Number</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.phone || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Gender</p>

          <p className="mt-1 font-semibold capitalize text-[var(--text-primary)]">
            {profile.gender || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Role</p>

          <p className="mt-1 font-semibold capitalize text-[var(--text-primary)]">
            {profile.role}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Account Status</p>

          <span
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              profile.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {profile.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Joined On</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Last Updated</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {new Date(profile.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
