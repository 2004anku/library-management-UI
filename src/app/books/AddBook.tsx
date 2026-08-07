"use client";

import { useState, useRef } from "react";
import { Upload, Download, FileSpreadsheet } from "lucide-react";

import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/model/model";

import { useCreateBook } from "@/features/books/hooks/useCreateBook";

type Props = {
  onClose: () => void;
};

export default function AddBookModal({ onClose }: Props) {
  const createBookMutation = useCreateBook();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const uploadExcel = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log(file);
  };

  const inputClass = `
    w-full
    h-19
    rounded-xl
    border
    border-[var(--border)]
    bg-[var(--bg-card)]
    px-5
    py-2.5
    text-sm
    text-white
    placeholder:text-slate-400
    outline-none
    transition
    focus:ring-2
    focus:ring-[var(--primary)]
`;

  const labelClass = `
    block
    mb-1.5
    text-sm
    font-medium
    text-slate-300
`;

  return (
    <Modal onClose={onClose} width="md">
      {/* HEADER */}

      <div
        className="
        flex
        items-start
        justify-between
        mb-7
        "
      >
        <div>
          <h2
            className="
            text-xl
            font-bold
            text-white
            flex
            gap-2
            items-center
            "
          >
            📚 Add Book
          </h2>

          <p
            className="
            mt-2
            text-sm
            text-slate-400
            "
          >
            Add one book manually or import from Excel.
          </p>
        </div>
      </div>

      {/* BULK IMPORT */}

      <div
        className="
        mb-8
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--bg-card)]
        p-5
        "
      >
        <div
          className="
          flex
          items-center
          gap-2
          mb-4
          text-sm
          font-semibold
          text-white
          "
        >
          <FileSpreadsheet size={18} />
          Bulk Import
        </div>

        <div
          className="
          flex
          gap-3
          "
        >
          <Button
            onClick={uploadExcel}
            className="
            rounded-xl
            px-5
            "
          >
            <Upload size={16} />
            Upload Excel
          </Button>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-[var(--border)]
            px-5
            py-2.5
            text-sm
            text-white
            hover:bg-white/5
            "
          >
            <Download size={16} />
            Download Template
          </button>

          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* FORM */}

      <div
        className="
 grid
 grid-cols-2
 gap-x-5
 gap-y-5
 "
      >
        {[
          {
            label: "Book Name",
            name: "bookName",
            placeholder: "Enter book name",
          },
          {
            label: "Author",
            name: "author",
            placeholder: "Enter author",
          },
          {
            label: "Category",
            name: "category",
            placeholder: "Computer Science",
          },
          {
            label: "ISBN",
            name: "isbn",
            placeholder: "978-XXXXXXXXXX",
          },
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className={labelClass}>{field.label}</label>

            <input
              name={field.name}
              value={(formData as any)[field.name]}
              placeholder={field.placeholder}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}

        <div className="space-y-1.5">
          <label className={labelClass}>Total Copies</label>

          <input
            type="number"
            name="totalCopies"
            value={formData.totalCopies}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
        mt-6
        pt-8
        border-t
        border-[var(--border)]
        flex
        justify-end
        gap-2
        "
      >
        <Button
          variant="secondary"
          onClick={onClose}
          className="rounded-xl px-6"
        >
          Cancel
        </Button>

        <Button
          loading={createBookMutation.isPending}
          onClick={handleSubmit}
          className="rounded-xl px-6"
        >
          Save Book
        </Button>
      </div>
    </Modal>
  );
}
