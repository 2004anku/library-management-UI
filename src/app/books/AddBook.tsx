"use client";

import { useRef, useState } from "react";
import { Download, FileSpreadsheet, Upload } from "lucide-react";

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

  // ---------------------------------------
  // FORM CHANGE
  // ---------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "totalCopies" ? Number(value) : value,
    }));
  };

  // ---------------------------------------
  // CREATE BOOK
  // ---------------------------------------

  const handleSubmit = async () => {
    await createBookMutation.mutateAsync(formData);

    onClose();
  };

  // ---------------------------------------
  // EXCEL UPLOAD
  // ---------------------------------------

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedExtensions = [".xlsx", ".xls"];

    const fileName = file.name.toLowerCase();

    const isExcelFile = allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    if (!isExcelFile) {
      alert("Please select a valid Excel file.");
      e.target.value = "";
      return;
    }

    console.log("Selected Excel file:", file);

    // TODO:
    // Connect bulk import API here.
  };

  // ---------------------------------------
  // DOWNLOAD TEMPLATE
  // ---------------------------------------

  const handleDownloadTemplate = () => {
    const headers = "Book Name,Author,Category,ISBN,Total Copies,Price\n";

    const example =
      "Clean Code,Robert C. Martin,Programming,9780132350884,5,500\n";

    const csvContent = headers + example;

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "book-import-template.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ---------------------------------------
  // COMMON STYLES
  // ---------------------------------------

  const inputClass = `
    w-full
    h-14
    rounded-xl
    border-8
    border-[var(--border)]
    bg-[var(--bg-card)]
    px-4
    text-sm
    text-[var(--text-primary)]
    placeholder:text-slate-400
    outline-none
    transition
    focus:border-[var(--primary)]
    focus:ring-2
    focus:ring-[var(--primary)]/20
  `;

  const labelClass = `
    block
    mb-4      
    text-sm
    font-medium
    text-slate-300
  `;

  return (
    <Modal title="📚 Add Book" onClose={onClose} width="md">
      {/* DESCRIPTION */}

      <p
        className="
          -mt-5
          mb-6
          text-sm
          text-[var(--text-secondary)]
        "
      >
        Add one book manually or import multiple books from Excel.
      </p>

      {/* -------------------------------- */}
      {/* BULK IMPORT */}
      {/* -------------------------------- */}

      <div
        className="
          mb-7
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--bg-card)]
          p-5
        "
      >
        {/* CARD HEADER */}

        <div className="mb-4 flex items-center gap-2">
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[var(--primary)]/10
              text-[var(--primary)]
            "
          >
            <FileSpreadsheet size={17} />
          </div>

          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-[var(--text-primary)]
              "
            >
              Bulk Import
            </h3>

            <p
              className="
                mt-0.5
                text-xs
                text-[var(--text-secondary)]
              "
            >
              Add multiple books using an Excel file.
            </p>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleUploadClick}
            className="
              rounded-xl
              px-5
            "
          >
            <Upload size={16} />
            Upload Excel
          </Button>

          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[var(--border)]
              bg-transparent
              px-5
              py-2.5
              text-sm
              font-medium
              text-[var(--text-primary)]
              transition
              hover:bg-white/5
            "
          >
            <Download size={16} />
            Download Template
          </button>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* -------------------------------- */}
      {/* MANUAL FORM */}
      {/* -------------------------------- */}

      <div
        className="
          grid
          grid-cols-2
          gap-x-8
          gap-y-10
          
        "
      >
        {/* BOOK NAME */}

        <div>
          <label className={labelClass}>Book Name</label>

          <input
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            placeholder="Enter book name"
            className={inputClass}
          />
        </div>

        {/* AUTHOR */}

        <div>
          <label className={labelClass}>Author</label>

          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author"
            className={inputClass}
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label className={labelClass}>Category</label>

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Computer Science"
            className={inputClass}
          />
        </div>

        {/* ISBN */}

        <div>
          <label className={labelClass}>ISBN</label>

          <input
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="978-XXXXXXXXXX"
            className={inputClass}
          />
        </div>

        {/* TOTAL COPIES */}

        <div>
          <label className={labelClass}>Total Copies</label>

          <input
            type="number"
            min="1"
            name="totalCopies"
            value={formData.totalCopies}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* PRICE */}

        <div>
          <label className={labelClass}>Price</label>

          <input
            type="number"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* -------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------- */}

      <div
        className="
          mt-8
          flex
          justify-end
          gap-2
          border-t
          border-[var(--border)]
          pt-4
        "
      >
        <Button
          variant="secondary"
          onClick={onClose}
          className="
            rounded-xl
            px-6
          "
        >
          Cancel
        </Button>

        <Button
          loading={createBookMutation.isPending}
          onClick={handleSubmit}
          className="
            rounded-xl
            px-6
          "
        >
          Save Book
        </Button>
      </div>
    </Modal>
  );
}
