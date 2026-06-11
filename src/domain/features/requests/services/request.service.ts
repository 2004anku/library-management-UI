import api from "@/lib/axios";

export const getAllRequests = async () => {
  const response = await api.get("/admin/book-circulation/book-requests");

  return response.data.data;
};
