"use client";

import ProtectedRoute from "@/components/auth/protectedRoutes";
import Sidebar from "@/components/sidebar/Sidebar";

import ProfileCard from "@/features/profile/components/profileCard";
import ProfileInfo from "@/features/profile/components/profileInfo";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8 bg-[var(--bg-main)]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              Admin Profile
            </h1>

            <p className="text-[var(--text-secondary)] mt-2">
              View and manage your account information.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left */}
            <div>
              <ProfileCard />
            </div>

            {/* Right */}
            <div className="xl:col-span-2">
              <ProfileInfo />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
