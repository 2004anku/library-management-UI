"use client";
// React

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useBooks } from "@/features/books/hooks/useBooks";
// Features
import { useDeleteBook } from "@/features/books/hooks/useDeleteBook";
import type { Book } from "@/features/books/types/bookType";

// Components
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import EditBook from "@/app/books/EditBook";
import AddBook from "@/app/books/AddBook";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui";
import { SearchInput } from "@/components/ui";
import DataTable from "@/components/ui/table/DataTable";
import TableHeader from "@/components/ui/page/TableHeader";
import TableColumns from "@/components/ui/table/TableColumns";
import TableActions from "@/components/ui/table/TableActions";
import ArchiveBook from "./ArchiveBook";
// Utils
import { handleApiError } from "@/utils/errorHandler";
import { capitalizeWords } from "@/utils/formatText";
const columns = [
  {
    key: "id",
    label: "ID",
    width: "15%",
  },
  {
    key: "title",
    label: "Title",
    width: "45%",
  },
  {
    key: "author",
    label: "Author",
    width: "25%",
  },
  {
    key: "action",
    label: "Action",
    width: "15%",
    align: "right" as const,
  },
];

function BooksContent() {
  const { data: books = [], isLoading: loading, error } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const deleteBookMutation = useDeleteBook();
  if (loading) {
    return <LoadingState message="" />;
  }

  if (error) {
    return <ErrorState message={handleApiError(error)} />;
  }

  if (books.length === 0) {
    return <EmptyState message="No books found." />;
  }
  const handleDelete = (bookId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) return;

    deleteBookMutation.mutate(bookId);
  };
  const handleEdit = (book: Book) => {
    setSelectedBook(book);

    setShowEditModal(true);
  };
  const filteredBooks = books.filter(
    (book: Book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <TableHeader
          title="Books"
          action={
            <div className="flex gap-3">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search books..."
              />

              <Button onClick={() => setShowAddModal(true)}>+ Add Book</Button>
              <Button onClick={() => setShowArchiveModal(true)}>
                Archive Books
              </Button>
            </div>
          }
        />

        <DataTable>
          <TableColumns columns={columns} />

          <tbody className="divide-y divide-[var(--border)]">
            {filteredBooks.map((book: Book, index: number) => (
              <tr
                key={book._id}
                className="hover:bg-[var(--table-hover)] transition-colors duration-200"
              >
                <td className="p-4 text-sm font-medium text-[var(--text-secondary)]">
                  {index + 1}
                </td>
                <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                  {capitalizeWords(book.bookName)}
                </td>

                <td className="p-4 text-sm text-[var(--text-secondary)]">
                  {capitalizeWords(book.author)}{" "}
                </td>

                <td className="p-4">
                  <TableActions>
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
                  </TableActions>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </main>
      {showEditModal && selectedBook && (
        <EditBook
          book={selectedBook}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBook(null);
          }}
        />
      )}
      {showAddModal && <AddBook onClose={() => setShowAddModal(false)} />}
      {showArchiveModal && (
        <ArchiveBook onClose={() => setShowArchiveModal(false)} />
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
