import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r p-4 flex flex-col">
      {/* Admin Info */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">BookHub</h1>

        <div className="mt-4 border rounded-lg p-3">
          <h2 className="font-semibold">Ankit Choudhary</h2>

          <p className="text-sm text-gray-500">admin@bookhub.com</p>
        </div>
      </div>

      {/* Menu */}
      <ul className="space-y-3 flex-1">
        <li>
          <Link href="/" className="block border rounded p-2">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link href="/books" className="block border rounded p-2">
            📚 Books
          </Link>
        </li>

        <li>
          <Link href="/students" className="block border rounded p-2">
            👨‍🎓 Students
          </Link>
        </li>

        <li>
          <Link href="/requests" className="block border rounded p-2">
            📋 Requests
          </Link>
        </li>
      </ul>

      {/* Logout */}
      <button className="border rounded p-2">Logout</button>
    </div>
  );
}
