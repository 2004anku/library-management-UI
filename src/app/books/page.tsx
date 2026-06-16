"use client";

import ProtectedRoute from "@/components/auth/protectedRoutes";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  getAllBooks,
  deleteBook,
} from "@/domain/features/books/services/book.service";
import { handleApiError } from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import type { Book } from "@/domain/features/books/types/bookType";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import EditBookModal from "@/components/book/EditBookModel";

function BooksContent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllBooks();

      setBooks(data);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  if (loading) {
    return <LoadingState message="" />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (books.length === 0) {
    return <EmptyState message="No books found." />;
  }
  const handleDelete = async (bookId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) return;

    try {
      await deleteBook(bookId);

      await fetchBooks();
    } catch (error) {
      alert(handleApiError(error));
    }
  };
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="heading-font text-3xl font-bold">Books</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search books..."
              className="
                w-full sm:w-64
                pl-4 pr-4 py-2
                bg-[var(--bg-card)]
                border border-[var(--border)]
                text-[var(--text-primary)]
                placeholder-[var(--text-secondary)]
                text-sm rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--primary)]
                focus:border-[var(--primary)]
                transition-all
              "
            />

            <button
              className="
                flex items-center justify-center gap-2
                bg-[var(--primary)]
                hover:bg-[var(--primary-hover)]
                text-[var(--text-primary)]
                px-5 py-2
                rounded-xl
                text-sm
                font-semibold
                transition-all duration-200
                hover:-translate-y-0.5
              "
            >
              + Add Book
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="w-[15%] text-left p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  ID
                </th>

                <th className="w-[45%] text-left p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Title
                </th>

                <th className="w-[25%] text-left p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Author
                </th>

                <th className="w-[15%] text-right p-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-[var(--table-hover)] transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-mono text-[var(--text-secondary)]">
                    {book._id.slice(-6)}
                  </td>

                  <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                    {book.bookName}
                  </td>

                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {book.author}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="px-3 py-1 rounded-lg hover:bg-[var(--success)] transition-all duration-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="px-3 py-1 rounded-lg hover:bg-[var(--danger)] transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {showEditModal && selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBook(null);
          }}
          onSuccess={fetchBooks}
        />
      )}
    </div>
  );
}

export default function BooksPage() {
  return (
    <ProtectedRoute>
      <BooksContent />
    </ProtectedRoute>
  );
}
