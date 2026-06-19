import api from "@/lib/axios/axios";

export const getAllRequests = async () => {
  const response = await api.get("/admin/book-circulation/book-requests");

  return response.data.data;
};

export const approveRequest = async (issueId: string) => {
  const response = await api.patch(
    `/admin/book-circulation/approve-request/${issueId}`,
  );

  return response.data;
};

export const rejectRequest = async (issueId: string) => {
  const response = await api.patch(
    `/admin/book-circulation/reject-request/${issueId}`,
  );

  return response.data;
};
export const updateRequestStatus = async (issueId: string, status: string) => {
  const response = await api.patch(
    `/admin/book-circulation/update-request-status/${issueId}`,
    { status },
  );

  return response.data;
};
export const assignBook = async (data: {
  studentId: string;
  bookId: string;
  dueDate?: string;
}) => {
  const response = await api.post("/admin/book-circulation/assign-book", data);

  return response.data;
};
