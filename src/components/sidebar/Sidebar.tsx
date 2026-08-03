"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { logoutUser } from "@/features/auth/services/auth.service";
import { useProfile } from "@/features/profile/hooks/useProfile";

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
  FaUserCircle,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: profile } = useProfile();

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
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            {profile?.collegeId?.collegeName || "BookHub"}
          </h1>

          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            {profile?.libraryId?.libraryName || ""}
          </p>

          {/* User Card */}
          <Link href="/profile">
            <div
              className="
                  mt-6
                  rounded-xl
                  border
                  border-transparent
                  bg-[var(--bg-card)]
                  p-4
                  cursor-pointer
                  transition-all
                  duration-200
                  hover:border-[var(--primary)]
                  hover:bg-slate-800
                  hover:shadow-lx
                "
            >
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-4xl text-[var(--primary)]" />

                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-[var(--text-primary)]">
                    {profile?.fullName}
                  </h2>

                  <p className="truncate text-sm text-[var(--text-secondary)]">
                    {profile?.email}
                  </p>
                </div>
              </div>

              <span className="mt-4 inline-block rounded-full bg-indigo-500/15 px-3 py-1 text-xs text-indigo-400 capitalize">
                {profile?.role}
              </span>

              <p className="mt-4 text-xs font-medium text-[var(--primary)]">
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
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}
