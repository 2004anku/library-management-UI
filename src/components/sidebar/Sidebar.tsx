"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useProfile } from "@/features/profile/hooks/useprofile";
import { storage } from "@/utils/storage";
import { logoutUser } from "@/features/auth/services/auth.service";

import {
  prefetchBooks,
  prefetchDashboard,
  prefetchRequests,
  prefetchStudents,
} from "@/lib/prefetch/prefetch";

import {
  FaBook,
  FaClipboardList,
  FaHome,
  FaSignOutAlt,
  FaUserGraduate,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const user = storage.getUser();
  const { data: profile, isLoading } = useProfile();
  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: FaHome,
      prefetch: prefetchDashboard,
    },
    {
      title: "Books",
      href: "/books",
      icon: FaBook,
      prefetch: prefetchBooks,
    },
    {
      title: "Students",
      href: "/students",
      icon: FaUserGraduate,
      prefetch: prefetchStudents,
    },
    {
      title: "Requests",
      href: "/requests",
      icon: FaClipboardList,
      prefetch: prefetchRequests,
    },
  ];

  const handleLogout = () => {
    logoutUser();
    router.replace("/login");
  };

  return (
    <aside className="w-64 bg-[var(--bg-sidebar)] border-r border-slate-800 flex flex-col justify-between p-6">
      <div>
        {/* Logo */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {/* <FaBookOpen className="text-[var(--primary)] text-3xl" /> */}

            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
                {profile?.collegeName || "BookHub"}
              </h1>

              {profile?.libraryName && (
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {profile.libraryName}
                </p>
              )}
            </div>
          </h1>

          {/* User Card */}
          <Link href="/profile">
            <div
              className="
      mt-6
      rounded-xl
      bg-[var(--bg-card)]
      p-4
      cursor-pointer
      transition-all
      duration-200
      border
      border-transparent
      hover:border-[var(--primary)]
      hover:bg-slate-700
      hover:shadow-lg
    "
            >
              <h2 className="font-semibold text-[var(--text-primary)]">
                {profile?.fullName}
              </h2>

              <p className="text-sm text-[var(--text-secondary)]">
                {profile?.email}
              </p>

              <span className="inline-block mt-3 rounded-full bg-indigo-500/15 px-3 py-1 text-xs text-indigo-400 capitalize">
                {profile?.role}
              </span>

              <p className="mt-3 text-xs text-[var(--primary)]">
                View Profile →
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={item.prefetch}
                onFocus={item.prefetch}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon />

                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}
