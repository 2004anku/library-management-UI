"use client";

import ProtectedRoute from "@/components/auth/protectedRoutes";
import Sidebar from "@/components/sidebar/Sidebar";

import ProfileCard from "@/features/profile/components/ProfileCard";
import PersonalInfoCard from "@/features/profile/components/personalInfoCard";
import CollegeInfoCard from "@/features/profile/components/collegeInfoCard";
import LibraryInfoCard from "@/features/profile/components/libraryInfoCard";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[var(--bg-main)]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="heading-font text-3xl font-bold text-[var(--text-primary)]">
              My Profile
            </h1>

            <p className="mt-2 text-[var(--text-secondary)]">
              Manage your personal information, college and library details.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {/* Left Side */}
            <div>
              <ProfileCard />
            </div>

            {/* Right Side */}
            <div className="space-y-6 xl:col-span-2">
              <PersonalInfoCard />

              <CollegeInfoCard />

              <LibraryInfoCard />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
