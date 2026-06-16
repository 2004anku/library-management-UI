"use client";

import { useState } from "react";
import type { Book } from "@/domain/features/books/types/bookType";
import { updateBook } from "@/domain/features/books/services/book.service";
import { handleApiError } from "@/utils/errorHandler";

type EditBookModalProps = {
  book: Book;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditBookModal({
  book,
  onClose,
  onSuccess,
}: EditBookModalProps) {
  const [formData, setFormData] = useState<Book>(book);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "totalCopies" || name === "availableCopies"
          ? Number(value)
          : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateBook(book._id, {
        bookName: formData.bookName,
        author: formData.author,
        category: formData.category,
        isbn: formData.isbn,
        totalCopies: formData.totalCopies,
        availableCopies: formData.availableCopies,
        price: formData.price,
      });

      alert("Book updated successfully");

      onSuccess();
      onClose();
    } catch (error) {
      alert(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-sidebar)] rounded-2xl p-6 w-full max-w-lg border border-[var(--border)]">
        <h2 className="heading-font text-2xl font-bold mb-6">Edit Book</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Book Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Book Name
            </label>

            <input
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Author
            </label>

            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Category
            </label>

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          {/* ISBN */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              ISBN
            </label>

            <input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          {/* Total Copies */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Total Copies
            </label>

            <input
              type="number"
              name="totalCopies"
              value={formData.totalCopies}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          {/* Available Copies */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Available Copies
            </label>

            <input
              type="number"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-[var(--border)]"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
