import Sidebar from "@/components/dashboard/Sidebar";
import { requests } from "../../../data/request";

export default function RequestsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Requests</h1>
          {/* {SEARCH} */}

          <input
            type="text"
            placeholder="Search requests..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800/80 text-sm rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
          />
        </div>
        {/* {TABLE} */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b border-slate-800">
              <tr>
                <th className="w-[10%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  ID
                </th>

                <th className="w-[30%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  STUDENT
                </th>

                <th className="w-[40%] text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  BOOK
                </th>

                <th className="w-[20%] text-right p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/40">
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-slate-800/30 transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-mono text-slate-400">
                    {request.id}
                  </td>

                  <td className="p-4 text-sm font-medium text-white">
                    {request.student}
                  </td>

                  <td className="p-4 text-sm text-slate-300">{request.book}</td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 rounded-lg hover:bg-[#526B58] transition-all duration-200">
                        Approve
                      </button>

                      <button className="px-3 py-1 rounded-lg hover:bg-red-900 transition-all duration-200">
                        Reject
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
