import {
  getAllRequestsApi,
  approveRequestApi,
  rejectRequestApi,
  updateRequestStatusApi,
  assignBookApi,
  deleteRequestApi,
  acceptReturnRequestApi,
} from "../api/requestApi";

export const getAllRequests = async () => {
  const response = await getAllRequestsApi();

  return response.data.data;
};

export const approveRequest = async (issueId: string) => {
  const response = await approveRequestApi(issueId);

  return response.data;
};

export const rejectRequest = async (issueId: string) => {
  const response = await rejectRequestApi(issueId);

  return response.data;
};

export const updateRequestStatus = async (issueId: string, status: string) => {
  const response = await updateRequestStatusApi(issueId, status);

  return response.data;
};

export const assignBook = async (data: {
  studentId: string;
  bookId: string;
  dueDate?: string;
}) => {
  const response = await assignBookApi(data);

  return response.data;
};
export const deleteRequest = async (issueId: string) => {
  const response = await deleteRequestApi(issueId);

  return response.data;
};

export const acceptReturnRequest = async (issueId: string) => {
  const response = await acceptReturnRequestApi(issueId);

  return response.data;
};
