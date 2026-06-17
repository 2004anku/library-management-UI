import api from "@/lib/axios/axios";
import type { Book } from "../types/bookType";

export const getAllBooks = async () => {
  const response = await api.get("/admin/books/all-books");

  return response.data.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await api.delete(`/admin/books/remove-book/${bookId}`);

  return response.data;
};

export const updateBook = async (bookId: string, bookData: Partial<Book>) => {
  const response = await api.patch(
    `/admin/books/update-book/${bookId}`,
    bookData,
  );

  return response.data.data;
};
export const createBook = async (bookData: Omit<Book, "_id">) => {
  const response = await api.post("/admin/books/create-book", bookData);

  return response.data.data;
};
