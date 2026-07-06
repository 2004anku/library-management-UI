"use client";
// Next/React
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Check, X, Pencil, Trash2 } from "lucide-react";

// Services
import { useRequests } from "@/features/requests/hooks/useRequests";
import { useApproveRequest } from "@/features/requests/hooks/useApproveRequest";
import { useRejectRequest } from "@/features/requests/hooks/useRejectRequest";
import { useUpdateRequestStatus } from "@/features/requests/hooks/useUpdateRequestStatus";
import { useDeleteRequest } from "@/features/requests/hooks/useDeleteRequest";
import { useAcceptReturnRequest } from "@/features/requests/hooks/useAcceptReturnRequest";
import { useStudents } from "@/features/students/hooks/useStudents";
import { useBooks } from "@/features/books/hooks/useBooks";
// Components

import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import AssignBookModal from "@/app/requests/AssignBook";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/ui/table/DataTable";
import TableHeader from "@/components/ui/page/TableHeader";
import TableColumns from "@/components/ui/table/TableColumns";
import TableEmpty from "@/components/ui/table/TableEmpty";
import TableActions from "@/components/ui/table/TableActions";
// Features

import type { Request } from "@/features/requests/types/requestTypes";

import SearchInput from "@/components/ui/input/SearchInput";
//Utils
import { requestStatusConfig } from "@/app/requests/requestStatusTheme";

function RequestsContent() {
  const { data: requests = [], isLoading: loading, error } = useRequests();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const { data: students = [] } = useStudents();
  const { data: books = [] } = useBooks();
  const [search, setSearch] = useState("");
  const approveRequestMutation = useApproveRequest();
  const rejectRequestMutation = useRejectRequest();
  const updateRequestStatusMutation = useUpdateRequestStatus();
  const deleteRequestMutation = useDeleteRequest();
  const acceptReturnRequestMutation = useAcceptReturnRequest();
  const columns = [
    {
      key: "id",
      label: "ID",
      width: "10%",
    },
    {
      key: "student",
      label: "Student",
      width: "30%",
    },
    {
      key: "book",
      label: "Book",
      width: "40%",
    },
    {
      key: "status",
      label: "Status",
      width: "20%",
    },
    {
      key: "actions",
      label: "Actions",
      width: "20%",
      align: "right" as const,
    },
  ];

  if (loading) {
    return <LoadingState message="" />;
  }

  if (error) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "Failed to load requests."
        }
      />
    );
  }

  if (requests.length === 0) {
    return <EmptyState message="No requests found." />;
  }
  const handleApprove = (issueId: string) => {
    approveRequestMutation.mutate(issueId);
  };
  const handleReject = (issueId: string) => {
    rejectRequestMutation.mutate(issueId);
  };
  const handleUpdateStatus = () => {
    if (!selectedRequest) return;

    updateRequestStatusMutation.mutate(
      {
        issueId: selectedRequest._id,
        status: selectedStatus,
      },
      {
        onSuccess: () => {
          setShowEditModal(false);
          setSelectedRequest(null);
        },
      },
    );
  };
  const filteredRequests = requests.filter(
    (request: Request) =>
      request.studentId?.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      request.bookId?.bookName?.toLowerCase().includes(search.toLowerCase()) ||
      request.status?.toLowerCase().includes(search.toLowerCase()),
  );
  const handleDeleteRequest = (issueId: string) => {
    if (!window.confirm("Delete this rejected request?")) return;

    deleteRequestMutation.mutate(issueId);
  };

  const handleAcceptReturn = (issueId: string) => {
    acceptReturnRequestMutation.mutate(issueId);
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <TableHeader
          title="Requests"
          action={
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
          }
        />

        <DataTable>
          <TableColumns columns={columns} />

          <tbody className="divide-y divide-[var(--border)]">
            {filteredRequests.map((request: Request, index: number) => (
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
                  <TableActions>
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="p-2 rounded-lg hover:bg-[var(--success)]/20"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() => handleReject(request._id)}
                          className="p-2 rounded-lg hover:bg-[var(--danger)]/20"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                    {request.status === "return-pending" && (
                      <button
                        onClick={() => handleAcceptReturn(request._id)}
                        className="p-2 rounded-lg hover:bg-[var(--success)]/20"
                        title="Accept Return"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setSelectedStatus(request.status);
                        setShowEditModal(true);
                      }}
                      className="p-2 rounded-lg hover:bg-blue-500/20"
                    >
                      <Pencil size={18} />
                    </button>
                  </TableActions>
                </td>
              </tr>
            ))}

            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={5}>
                  <TableEmpty message="No requests found" />
                </td>
              </tr>
            )}
          </tbody>
        </DataTable>

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
