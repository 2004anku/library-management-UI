import api from "@/lib/axios/axios";

export const getArchivedBooksApi = async () => {
  const response = await api.get("/admin/books/archived-books");
  return response.data.data;
};

export const restoreBookApi = async (bookId: string) => {
  const response = await api.patch(`/admin/books/restore-book/${bookId}`);

  return response.data;
};
