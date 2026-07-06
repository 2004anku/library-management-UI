import type { Book, CreateBookPayload } from "../types/bookType";

import {
  getAllBooksApi,
  deleteBookApi,
  updateBookApi,
  createBookApi,
  getArchivedBooksApi,
  restoreBookApi,
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

export const createBook = async (bookData: CreateBookPayload) => {
  const response = await createBookApi(bookData);

  return response.data.data;
};

export const getDeletedBooks = async () => {
  const response = await getAllBooksApi();

  return response.data.data.filter((book: Book) => book.isDeleted);
};

export const getArchivedBooks = async () => {
  const response = await getArchivedBooksApi();
  return response;
};

export const restoreBook = async (bookId: string) => {
  const response = await restoreBookApi(bookId);
  return response;
};
