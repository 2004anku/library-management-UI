import api from "@/lib/axios";

export const getAllRequestsApi = async () => {
  const response = await api.get("/admin/book-circulation/all-requests");

  return response.data.data;
};
