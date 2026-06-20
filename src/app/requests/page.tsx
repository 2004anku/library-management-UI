"use client";
// Next/React
import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Check, X, Pencil } from "lucide-react";
import toast from "react-hot-toast";

// Services
import {
  getAllRequests,
  approveRequest,
  rejectRequest,
  updateRequestStatus,
} from "@/domain/features/requests/services/request.service";
import { getAllStudents } from "@/domain/features/students/services/student.service";
import { getAllBooks } from "@/domain/features/books/services/book.service";

// Components

import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import AssignBookModal from "@/components/request/AssignBookModal";
import { Button } from "@/components/ui";

// Features

import type { Request } from "@/domain/features/requests/types/requestTypes";
import type { Student } from "@/domain/features/students/types/studentType";
import type { Book } from "@/domain/features/books/types/bookType";
import SearchInput from "@/components/ui/SearchInput";
//Utils
import { handleApiError } from "@/utils/errorHandler";
import { requestStatusConfig } from "@/config/requestStatusTheme";

function RequestsContent() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");

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

    getAllStudents().then(setStudents);

    getAllBooks().then(setBooks);
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

      toast.success("Request approved successfully");

      await fetchRequests();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };
  const handleReject = async (issueId: string) => {
    try {
      await rejectRequest(issueId);

      toast.success("Request reject successfully");

      await fetchRequests();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };
  const handleUpdateStatus = async () => {
    if (!selectedRequest) return;

    try {
      await updateRequestStatus(selectedRequest._id, selectedStatus);

      setShowEditModal(false);
      setSelectedRequest(null);

      toast.success("Request updated successfully");

      await fetchRequests();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };
  const filteredRequests = requests.filter(
    (request) =>
      request.studentId?.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      request.bookId?.bookName?.toLowerCase().includes(search.toLowerCase()) ||
      request.status?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="heading-font text-3xl font-bold">Requests</h1>

          <div className="flex items-center gap-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search requests..."
            />

            <Button onClick={() => setShowAssignModal(true)}>
              + Assign Book
            </Button>
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
              {filteredRequests.map((request, index) => (
                <tr
                  key={request._id}
                  className="hover:bg-[var(--table-hover)] transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-mono text-[var(--text-secondary)]">
                    {index + 1}
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
                        <Check size={18} />
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        className="p-2 rounded-lg hover:bg-[var(--danger)]/20 transition-all duration-200"
                      >
                        <X size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setSelectedStatus(request.status);
                          setShowEditModal(true);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
                      >
                        <Pencil size={18} />
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
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-card)] p-6 rounded-xl w-[400px]">
              <h2 className="text-xl font-bold mb-4">Edit Request Status</h2>

              <label className="block text-sm mb-2">Status</label>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border p-2 rounded-lg mb-4 bg-transparent"
              >
                <option value="issued">Issued</option>
                <option value="rejected">Rejected</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 rounded-lg bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {showAssignModal && (
          <AssignBookModal
            students={students}
            books={books}
            onClose={() => setShowAssignModal(false)}
            onSuccess={fetchRequests}
          />
        )}
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
