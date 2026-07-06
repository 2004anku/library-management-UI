"use client";

import { useState } from "react";
import Button from "@/components/ui/button/Button";
import { useCreateBook } from "@/features/books/hooks/useCreateBook";

type Props = {
  onClose: () => void;
};

export default function AddBookModal({ onClose }: Props) {
  const createBookMutation = useCreateBook();
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    category: "",
    isbn: "",
    totalCopies: 1,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "totalCopies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    await createBookMutation.mutateAsync(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-sidebar)] rounded-2xl p-6 w-full max-w-lg border border-[var(--border)]">
        <h2 className="text-2xl font-bold mb-6">Add Book</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Book Name</label>

            <input
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Author</label>

            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Category</label>

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">ISBN</label>

            <input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Total Copies</label>

            <input
              type="number"
              name="totalCopies"
              value={formData.totalCopies}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 border rounded-xl">
            Cancel
          </button>

          <Button loading={createBookMutation.isPending} onClick={handleSubmit}>
            Save Book
          </Button>
        </div>
      </div>
    </div>
  );
}
