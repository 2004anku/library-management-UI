import api from "@/lib/axios/axios";

export const getAllRequestsApi = async () => {
  return await api.get("/admin/book-circulation/book-requests");
};

export const approveRequestApi = async (issueId: string) => {
  return await api.patch(`/admin/book-circulation/approve-request/${issueId}`);
};

export const rejectRequestApi = async (issueId: string) => {
  return await api.patch(`/admin/book-circulation/reject-request/${issueId}`);
};

export const updateRequestStatusApi = async (
  issueId: string,
  status: string,
) => {
  return await api.patch(
    `/admin/book-circulation/update-request-status/${issueId}`,
    { status },
  );
};

export const assignBookApi = async (data: {
  studentId: string;
  bookId: string;
  dueDate?: string;
}) => {
  return await api.post("/admin/book-circulation/assign-book", data);
};

export const deleteRequestApi = async (issueId: string) => {
  return await api.delete(`/admin/book-circulation/delete-request/${issueId}`);
};
