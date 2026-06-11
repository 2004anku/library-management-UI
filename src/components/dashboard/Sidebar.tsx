import Link from "next/link";

import {
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-full md:w-64 bg-[var(--bg-sidebar)] border-r border-slate-800/60 p-6 flex flex-col justify-between shrink-0">
      {/* Admin Info */}
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Book<span className="text-[var(--primary)]">Hub</span>
          </h1>

          <div className="mt-4 bg-[var(--bg-card)] rounded-xl p-4">
            <h2 className="font-semibold text-[var(--text-primary)]">
              Ankit Choudhary
            </h2>

            <p className="text-sm text-[var(--text-secondary)]">
              admin@bookhub.com
            </p>
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
hover:bg-slate-800/70
hover:translate-x-1
transition-all duration-200"
            >
              <FaHome />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/books"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
hover:bg-slate-800/70
hover:translate-x-1
transition-all duration-200"
            >
              <FaBook />
              Books
            </Link>
          </li>

          <li>
            <Link
              href="/students"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
hover:bg-slate-800/70
hover:translate-x-1
transition-all duration-200"
            >
              <FaUserGraduate />
              Students
            </Link>
          </li>

          <li>
            <Link
              href="/requests"
              className="flex items-center gap-3 px-4 py-3 rounded-xl
hover:bg-slate-800/70
hover:translate-x-1
transition-all duration-200"
            >
              <FaClipboardList />
              Requests
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[var(--danger)] transition-all duration-200">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}
