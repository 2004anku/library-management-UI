"use client";

import { useEffect, useState } from "react";
import { X, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

import type { Book } from "@/features/books/types/bookType";
import { handleApiError } from "@/utils/errorHandler";
import {
  getArchivedBooksApi,
  restoreBookApi,
} from "@/features/Restore/api/restoredApi";
type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function ArchiveBook({ onClose, onSuccess }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // FETCH ARCHIVED BOOKS
  const fetchArchivedBooks = async () => {
    try {
      setLoading(true);

      const data = await getArchivedBooksApi();

      setBooks(data);
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedBooks();
  }, []);

  // RESTORE BOOK
  const handleRestore = async (bookId: string) => {
    try {
      await restoreBookApi(bookId);

      toast.success("Book restored successfully");

      fetchArchivedBooks();
      onSuccess();
    } catch (error) {
      toast.error(handleApiError(error));
    }
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
            {books.map((book) => (
              <div
                key={book._id}
                className="flex justify-between items-center p-3 border border-[var(--border)] rounded-xl"
              >
                <div>
                  <p className="font-medium">{book.bookName}</p>
                  <p className="text-xs text-gray-400">{book.author}</p>
                </div>

                <button
                  onClick={() => handleRestore(book._id)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/30"
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
