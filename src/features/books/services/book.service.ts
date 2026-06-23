import type { Book } from "../types/bookType";

import {
  getAllBooksApi,
  deleteBookApi,
  updateBookApi,
  createBookApi,
} from "../api/bookApi";

export const getAllBooks = async () => {
  const response = await getAllBooksApi();

  return response.data.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await deleteBookApi(bookId);

  return response.data;
};

export const updateBook = async (bookId: string, bookData: Partial<Book>) => {
  const response = await updateBookApi(bookId, bookData);

  return response.data.data;
};

export const createBook = async (bookData: Omit<Book, "_id">) => {
  const response = await createBookApi(bookData);

  return response.data.data;
};
