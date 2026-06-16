"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  getAllRequests,
  approveRequest,
  rejectRequest,
} from "@/domain/features/requests/services/request.service";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import { requestStatusConfig } from "@/config/requestStatus";
import { handleApiError } from "@/utils/errorHandler";
import type { Request } from "@/domain/features/requests/types/requestTypes";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";

function RequestsContent() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllRequests();

      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);

      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (loading) {
    return <LoadingState message="" />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (requests.length === 0) {
    return <EmptyState message="No requests found." />;
  }
  const handleApprove = async (issueId: string) => {
    try {
      await approveRequest(issueId);

      await fetchRequests();
    } catch (error) {
      console.error("Approve Error:", error);

      alert(handleApiError(error));
    }
  };
  const handleReject = async (issueId: string) => {
    try {
      await rejectRequest(issueId);

      await fetchRequests();
    } catch (error) {
      console.error("Reject Error:", error);

      alert(handleApiError(error));
    }
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="heading-font text-3xl font-bold">Requests</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search requests..."
              className="
                w-full sm:w-64
                pl-4 pr-4 py-2
                bg-[var(--bg-card)]
                border border-[var(--border)]
                text-[var(--text-primary)]
                placeholder-[var(--text-secondary)]
                text-sm rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--primary)]
                focus:border-[var(--primary)]
                transition-all
              "
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="w-[10%] text-left p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  ID
                </th>

                <th className="w-[30%] text-left p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Student
                </th>

                <th className="w-[40%] text-left p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Book
                </th>

                <th className="w-[20%] text-left p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  STATUS
                </th>

                <th className="w-[20%] text-right p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {requests.map((request) => (
                <tr
                  key={request._id}
                  className="hover:bg-[var(--table-hover)] transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-mono text-[var(--text-secondary)]">
                    {request._id.slice(-6)}
                  </td>

                  <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                    {request.studentId?.studentName || "N/A"}
                  </td>

                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {request.bookId?.bookName || "N/A"}
                  </td>

                  <td className="p-4">
                    {request.status && requestStatusConfig[request.status] ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          requestStatusConfig[request.status].className
                        }`}
                      >
                        {requestStatusConfig[request.status].label}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs bg-slate-500/20 text-slate-400">
                        Unknown
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="px-3 py-1 rounded-lg hover:bg-[var(--success)] transition-all duration-200"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        className="px-3 py-1 rounded-lg hover:bg-[var(--danger)] transition-all duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-[var(--text-secondary)]"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default function RequestsPage() {
  return (
    <ProtectedRoute>
      <RequestsContent />
    </ProtectedRoute>
  );
}
