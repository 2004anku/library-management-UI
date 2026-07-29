"use client";

import { useProfile } from "../hooks/useProfile";

export default function LibraryInfoCard() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
        Loading...
      </div>
    );
  }

  if (!profile?.libraryId) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
      <h2 className="mb-8 text-2xl font-bold text-[var(--text-primary)]">
        Library Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Library Name</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.libraryId.libraryName}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Library Email</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.libraryId.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Library Phone</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.libraryId.phone}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Working Hours</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.libraryId.workingHours?.open} -{" "}
            {profile.libraryId.workingHours?.close}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">Library Status</p>

          <span
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              profile.libraryId.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {profile.libraryId.status}
          </span>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">
            Subscription Plan
          </p>

          <p className="mt-1 font-semibold capitalize text-[var(--text-primary)]">
            {profile.libraryId.plan}
          </p>
        </div>
      </div>
    </div>
  );
}
