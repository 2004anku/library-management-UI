import Sidebar from "@/components/dashboard/Sidebar";
import { students } from "../../../data/student";

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Students</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800/80 text-sm rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
            />

            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
              + Add Student
            </button>
          </div>
        </div>
        {/* {TABLE} */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b border-slate-800">
              <tr>
                <th className="w-[8%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  ID
                </th>

                <th className="w-[18%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Name
                </th>

                <th className="w-[15%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Course
                </th>

                <th className="w-[22%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email
                </th>

                <th className="w-[15%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Phone
                </th>

                <th className="w-[10%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Semester
                </th>

                <th className="w-[12%] text-right p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/40">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-800/30 transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-mono text-slate-400">
                    {student.id}
                  </td>

                  <td className="p-4 text-sm font-medium text-white">
                    {student.name}
                  </td>

                  <td className="p-4 text-sm text-slate-300">
                    {student.course}
                  </td>

                  <td className="p-4 text-sm text-slate-300">
                    {student.email}
                  </td>

                  <td className="p-4 text-sm text-slate-300">
                    {student.phone}
                  </td>

                  <td className="p-4 text-sm text-slate-300">
                    {student.semester}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 rounded-lg hover:bg-[#526B58] transition-all duration-200">
                        Edit
                      </button>

                      <button className="px-3 py-1 rounded-lg hover:bg-red-900 transition-all duration-200">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
