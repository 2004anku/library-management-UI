import Sidebar from "@/components/dashboard/Sidebar";
import { requests } from "../../../data/request";

export default function RequestsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Requests</h1>

          <input
            type="text"
            placeholder="Search requests..."
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <table className="w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b ">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Book</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="p-3">{request.id}</td>
                <td className="p-3">{request.student}</td>
                <td className="p-3">{request.book}</td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="border px-3 py-1 rounded ">
                      Approve
                    </button>

                    <button className="border px-3 py-1 rounded ">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
