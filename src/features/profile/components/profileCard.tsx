"use client";

import { storage } from "@/utils/storage";
import { FaUserCircle, FaPen } from "react-icons/fa";

export default function ProfileCard() {
  const user = storage.getUser();

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <FaUserCircle className="text-8xl text-[var(--primary)]" />

        <h2 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
          {user?.fullName}
        </h2>

        <p className="text-[var(--text-secondary)] mt-1">{user?.email}</p>

        <span className="mt-4 px-4 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm capitalize">
          {user?.role}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-8" />

      {/* College */}
      <div className="mb-5">
        <p className="text-sm text-[var(--text-secondary)]">College</p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {user?.collegeName ?? "Not Assigned"}
        </h3>
      </div>

      {/* Library */}
      <div className="mb-8">
        <p className="text-sm text-[var(--text-secondary)]">Library</p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {user?.libraryName ?? "Not Assigned"}
        </h3>
      </div>

      {/* Edit Button */}
      <button
        className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[var(--primary)]
          text-white
          py-3
          hover:opacity-90
          transition
        "
      >
        <FaPen />
        Edit Profile
      </button>
    </div>
  );
}
