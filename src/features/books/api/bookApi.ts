import api from "@/lib/axios/axios";
import type { Book, CreateBookPayload } from "../types/bookType";

export const getAllBooksApi = async () => {
  return await api.get("/library-admin/books/all-books");
};

export const deleteBookApi = async (bookId: string) => {
  return await api.delete(`/library-admin/books/remove-book/${bookId}`);
};

export const updateBookApi = async (
  bookId: string,
  bookData: Partial<Book>,
) => {
  return await api.patch(
    `/library-admin/books/update-book/${bookId}`,
    bookData,
  );
};

export const createBookApi = async (bookData: CreateBookPayload) => {
  return await api.post("/library-admin/books/create-book", bookData);
};
export const getArchivedBooksApi = async () => {
  const response = await api.get("/library-admin/books/archived-books");
  return response.data.data;
};

export const restoreBookApi = async (bookId: string) => {
  const response = await api.patch(
    `/library-admin/books/restore-book/${bookId}`,
  );

  return response.data;
};
