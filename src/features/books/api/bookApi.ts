import api from "@/lib/axios/axios";
import type { Book, CreateBookPayload } from "../types/bookType";

export const getAllBooksApi = async () => {
  return await api.get("/admin/books/all-books");
};

export const deleteBookApi = async (bookId: string) => {
  return await api.delete(`/admin/books/remove-book/${bookId}`);
};

export const updateBookApi = async (
  bookId: string,
  bookData: Partial<Book>,
) => {
  return await api.patch(`/admin/books/update-book/${bookId}`, bookData);
};

export const createBookApi = async (bookData: CreateBookPayload) => {
  return await api.post("/admin/books/create-book", bookData);
};
export const getArchivedBooksApi = async () => {
  const response = await api.get("/admin/books/archived-books");
  return response.data.data;
};

export const restoreBookApi = async (bookId: string) => {
  const response = await api.patch(`/admin/books/restore-book/${bookId}`);

  return response.data;
};
