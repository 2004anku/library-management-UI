import api from "@/lib/axios/axios";
import type { Book } from "../types/bookType";

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

export const createBookApi = async (bookData: Omit<Book, "_id">) => {
  return await api.post("/admin/books/create-book", bookData);
};
