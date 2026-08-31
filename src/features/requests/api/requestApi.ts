import api from "@/lib/axios/axios";

export const getAllRequestsApi = async () => {
  return await api.get("/library-admin/book-circulation/book-requests");
};

export const approveRequestApi = async (issueId: string) => {
  return await api.patch(
    `/library-admin/book-circulation/approve-request/${issueId}`,
  );
};

export const rejectRequestApi = async (issueId: string) => {
  return await api.patch(
    `/library-admin/book-circulation/reject-request/${issueId}`,
  );
};

export const updateRequestStatusApi = async (
  issueId: string,
  status: string,
) => {
  return await api.patch(
    `/library-admin/book-circulation/update-request-status/${issueId}`,
    { status },
  );
};

export const assignBookApi = async (data: {
  studentId: string;
  bookId: string;
  dueDate?: string;
}) => {
  return await api.post("/library-admin/book-circulation/assign-book", data);
};

export const deleteRequestApi = async (issueId: string) => {
  return await api.delete(
    `/library-admin/book-circulation/delete-request/${issueId}`,
  );
};

export const acceptReturnRequestApi = async (issueId: string) => {
  return await api.patch(
    `/library-admin/book-circulation/accept-return-request/${issueId}`,
  );
};
