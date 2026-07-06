export type Book = {
  _id: string;
  bookName: string;
  author: string;
  category: string;
  availableCopies: number;
  totalCopies: number;
  isbn: string;
  price: number;
  libraryId?: string;
  isDeleted?: boolean;
};
export interface CreateBookPayload {
  bookName: string;
  author: string;
  category: string;
  isbn: string;
  totalCopies: number;
  price: number;
}
