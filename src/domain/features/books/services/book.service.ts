import api from "@/lib/axios/axios";

export const getAllBooks = async () => {
  const response = await api.get("/admin/books/all-books");

  console.log("BOOK API RESPONSE:", response.data);

  return response.data.data;
};
