"use client";

import { X, RotateCcw } from "lucide-react";
import type { Book } from "@/features/books/types/bookType";
import { useArchivedBooks } from "@/features/books/hooks/useArchivedBooks";
import { useRestoreBook } from "@/features/books/hooks/useRestoreBook";
type Props = {
  onClose: () => void;
};

export default function ArchiveBook({ onClose }: Props) {
  const { data: books = [], isLoading: loading } = useArchivedBooks();

  const restoreBookMutation = useRestoreBook();

  // RESTORE BOOK
  const handleRestore = async (bookId: string) => {
    if (restoreBookMutation.isPending) return;
    await restoreBookMutation.mutateAsync(bookId);
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-card)] w-[700px] rounded-2xl p-5 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Archived Books</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-gray-400">No archived books found</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-auto">
            {books.map((book: Book) => (
              <div
                key={book._id}
                className="flex justify-between items-center p-3 border border-[var(--border)] rounded-xl"
              >
                <div>
                  <p className="font-medium">{book.bookName}</p>
                  <p className="text-xs text-gray-400">{book.author}</p>
                </div>

                <button
                  disabled={restoreBookMutation.isPending}
                  onClick={() => handleRestore(book._id)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50"
                >
                  <RotateCcw size={16} />
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
