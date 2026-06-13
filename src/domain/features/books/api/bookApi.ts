import api from "@/lib/axios/axios";

export const getBooks = async () => {
  const response = await api.get("/api/v1/admin/books");

  return response.data;
};
