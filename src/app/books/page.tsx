"use client";
// React

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

// Features
import {
  getAllBooks,
  deleteBook,
  updateBook,
} from "@/domain/features/books/services/book.service";
import type { Book } from "@/domain/features/books/types/bookType";

// Components
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import EditBookModal from "@/components/book/EditBookModel";
import AddBookModal from "@/components/book/AddBookModel";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui";
import { SearchInput } from "@/components/ui";

// Utils
import { handleApiError } from "@/utils/errorHandler";

function BooksContent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");

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
    } catch (error) {}
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);

    setShowEditModal(true);
  };
  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="heading-font text-3xl font-bold">Books</h1>

          <div className="flex gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search books..."
            />

            <Button onClick={() => setShowAddModal(true)}>+ Add Book</Button>
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
              {filteredBooks.map((book, index) => (
                <tr
                  key={book._id}
                  className="hover:bg-[var(--table-hover)] transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-medium text-[var(--text-secondary)]">
                    {index + 1}
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
                        className="p-2 rounded-lg hover:bg-[var(--success)]/20 transition-all duration-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="p-2 rounded-lg hover:bg-[var(--danger)]/20 transition-all duration-200"
                      >
                        <Trash2 size={18} />
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
      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
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
