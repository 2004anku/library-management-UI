"use client";

import { useProfile } from "../hooks/useProfile";

export default function CollegeInfoCard() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
        Loading...
      </div>
    );
  }

  if (!profile?.collegeId) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
      <h2 className="mb-8 text-2xl font-bold text-[var(--text-primary)]">
        College Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Name</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.collegeId.collegeName}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Code</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.collegeId.collegeCode}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Email</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.collegeId.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--text-secondary)]">College Phone</p>

          <p className="mt-1 font-semibold text-[var(--text-primary)]">
            {profile.collegeId.phone}
          </p>
        </div>

        {profile.collegeId.website && (
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Website</p>

            <p className="mt-1 font-semibold text-[var(--text-primary)]">
              {profile.collegeId.website}
            </p>
          </div>
        )}

        {profile.collegeId.establishedYear && (
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Established</p>

            <p className="mt-1 font-semibold text-[var(--text-primary)]">
              {profile.collegeId.establishedYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
