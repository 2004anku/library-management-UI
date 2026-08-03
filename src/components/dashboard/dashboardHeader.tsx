"use client";

import { useProfile } from "@/features/profile/hooks/useProfile";

export default function DashboardHeader() {
  const { data: profile } = useProfile();

  const today = new Date();

  return (
    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
          Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Welcome back,
          <span className="ml-2 text-[var(--primary)]">
            {profile?.fullName?.split(" ")[0] || "Admin"}
          </span>
        </h1>

        <p className="mt-3 max-w-xl text-[15px] text-[var(--text-secondary)]">
          Here's a quick overview of your library. Monitor books, students,
          requests, and pending fines from one place.
        </p>
      </div>

      {/* Right */}
      <div className="rounded-2xl border border-slate-800 bg-[var(--bg-card)] px-6 py-4 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
          Today
        </p>

        <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
          {today.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>
    </div>
  );
}
