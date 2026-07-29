"use client";

import { useState } from "react";
import { FaPen, FaUserCircle } from "react-icons/fa";

import { useProfile } from "../hooks/useProfile";
import EditProfileModal from "./EditProfileModal";

export default function ProfileCard() {
  const { data: profile, isLoading } = useProfile();

  const [openModal, setOpenModal] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-sm">
        {/* Avatar */}

        <div className="flex flex-col items-center">
          <FaUserCircle className="text-8xl text-[var(--primary)]" />

          <h2 className="mt-5 text-2xl font-bold text-[var(--text-primary)]">
            {profile.fullName}
          </h2>

          <p className="mt-2 text-[var(--text-secondary)]">{profile.email}</p>

          <span className="mt-4 rounded-full bg-[var(--primary)]/10 px-4 py-1 text-sm capitalize text-[var(--primary)]">
            {profile.role}
          </span>
        </div>

        <div className="my-8 border-t border-[var(--border)]" />

        <div className="mb-5">
          <p className="text-sm text-[var(--text-secondary)]">College</p>

          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {profile.collegeId?.collegeName}
          </h3>
        </div>

        <div className="mb-8">
          <p className="text-sm text-[var(--text-secondary)]">Library</p>

          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {profile.libraryId?.libraryName}
          </h3>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[var(--primary)]
            py-3
            text-white
            transition
            hover:opacity-90
          "
        >
          <FaPen />
          Edit Profile
        </button>
      </div>

      {openModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
