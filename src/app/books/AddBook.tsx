"use client";

import { useRef, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/model/model";

import { useCreateBook } from "@/features/books/hooks/useCreateBook";
import { useBookImport } from "@/features/data-transfer/hooks/useBookImport";

type Props = {
  onClose: () => void;
};

type PreviewRow = {
  rowNumber: number;
  data: {
    bookName?: string;
    author?: string;
    category?: string;
    isbn?: string;
    totalCopies?: number;
    price?: number;
  };
  errors: string[];
  valid: boolean;
};

type PreviewResponse = {
  success: boolean;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  data: PreviewRow[];
};

export default function AddBookModal({ onClose }: Props) {
  const createBookMutation = useCreateBook();

  const { preview, importBooks } = useBookImport();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    category: "",
    isbn: "",
    totalCopies: 1,
    price: 0,
  });

  const [previewData, setPreviewData] = useState<PreviewResponse | null>(null);

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "totalCopies" ? Number(value) : value,
    }));
  };

  // ==========================================
  // CREATE BOOK MANUALLY
  // ==========================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createBookMutation.mutateAsync(formData);

    onClose();
  };

  // ==========================================
  // OPEN FILE SELECTOR
  // ==========================================

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ==========================================
  // EXCEL FILE SELECT
  // ==========================================

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedExtensions = [".xlsx", ".xls"];

    const fileName = file.name.toLowerCase();

    const isExcelFile = allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    if (!isExcelFile) {
      alert("Please select a valid Excel file (.xlsx or .xls)");

      e.target.value = "";

      return;
    }

    preview.mutate(file, {
      onSuccess: (response) => {
        setPreviewData(response);
      },
    });
  };

  // ==========================================
  // IMPORT BOOKS
  // ==========================================

  const handleImport = async () => {
    if (!previewData) return;

    const validRows = previewData.data.filter((row) => row.valid);

    if (validRows.length === 0) {
      alert("There are no valid books to import.");
      return;
    }

    await importBooks.mutateAsync(validRows);

    setPreviewData(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  // ==========================================
  // CANCEL PREVIEW
  // ==========================================

  const handleCancelPreview = () => {
    setPreviewData(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // DOWNLOAD TEMPLATE
  // ==========================================

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

  // ==========================================
  // COMMON STYLES
  // ==========================================

  const inputClass = `
    w-full
    h-10
    rounded-lg
    border
    border-[var(--border)]
    bg-[var(--bg-card)]
    px-3.5
    text-sm
    text-[var(--text-primary)]
    placeholder:text-slate-500
    outline-none
    transition-all
    focus:border-[var(--primary)]
    focus:ring-2
    focus:ring-[var(--primary)]/20
  `;

  const labelClass = `
    block
    mb-1.5
    text-xs
    font-medium
    text-[var(--text-secondary)]
  `;

  // ==========================================
  // PREVIEW SCREEN
  // ==========================================

  if (previewData) {
    return (
      <Modal onClose={onClose}>
        <div className="space-y-5">
          {/* ==========================================
              PREVIEW HEADER
              ========================================== */}

          <div className="mb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  Review Book Import
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Review the Excel data before importing it into the library.
                </p>
              </div>

              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                {previewData.totalRows} rows detected
              </div>
            </div>
          </div>

          {/* ==========================================
              SUMMARY
              ========================================== */}

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* TOTAL */}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
              <p className="text-xs font-medium text-[var(--text-secondary)]">
                Total Records
              </p>

              <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                {previewData.totalRows}
              </p>
            </div>

            {/* VALID */}

            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-xs font-medium text-[var(--text-secondary)]">
                Valid Records
              </p>

              <p className="mt-1 flex items-center gap-2 text-2xl font-semibold text-green-500">
                <CheckCircle size={19} />
                {previewData.validRows}
              </p>
            </div>

            {/* INVALID */}

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-xs font-medium text-[var(--text-secondary)]">
                Invalid Records
              </p>

              <p className="mt-1 flex items-center gap-2 text-2xl font-semibold text-red-500">
                <AlertCircle size={19} />
                {previewData.invalidRows}
              </p>
            </div>
          </div>

          {/* ==========================================
              VALIDATION MESSAGE
              ========================================== */}

          {previewData.invalidRows > 0 && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0 text-yellow-500"
              />

              <div>
                <p className="text-xs font-medium text-yellow-400">
                  Some records need attention
                </p>

                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                  Invalid rows will not be imported. You can cancel, correct the
                  Excel file, and upload it again.
                </p>
              </div>
            </div>
          )}

          {/* ==========================================
              PREVIEW TABLE
              ========================================== */}

          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            {/* Horizontal scroll container */}

            <div className="max-h-[420px] overflow-auto custom-scrollbar">
              <table className="min-w-[1050px] w-full table-fixed text-left text-xs">
                <thead className="sticky top-0 z-10 bg-[var(--bg-card)]">
                  <tr className="border-b border-[var(--border)]">
                    <th className="w-[60px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      Row
                    </th>

                    <th className="w-[190px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      Book
                    </th>

                    <th className="w-[170px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      Author
                    </th>

                    <th className="w-[150px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      Category
                    </th>

                    <th className="w-[150px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      ISBN
                    </th>

                    <th className="w-[90px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      Copies
                    </th>

                    <th className="w-[100px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      Price
                    </th>

                    <th className="w-[170px] px-3 py-3 font-semibold text-[var(--text-secondary)]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {previewData.data.map((row) => (
                    <tr
                      key={row.rowNumber}
                      className={`
                        border-b
                        border-[var(--border)]
                        last:border-0
                        transition-colors
                        ${
                          row.valid
                            ? "hover:bg-white/[0.025]"
                            : "bg-red-500/[0.025] hover:bg-red-500/[0.05]"
                        }
                      `}
                    >
                      {/* ROW */}

                      <td className="px-3 py-3 font-medium text-[var(--text-secondary)]">
                        {row.rowNumber}
                      </td>

                      {/* BOOK */}

                      <td
                        className="truncate px-3 py-3 font-medium text-[var(--text-primary)]"
                        title={row.data.bookName || "-"}
                      >
                        {row.data.bookName || "-"}
                      </td>

                      {/* AUTHOR */}

                      <td
                        className="truncate px-3 py-3 text-[var(--text-primary)]"
                        title={row.data.author || "-"}
                      >
                        {row.data.author || "-"}
                      </td>

                      {/* CATEGORY */}

                      <td
                        className="truncate px-3 py-3 text-[var(--text-secondary)]"
                        title={row.data.category || "-"}
                      >
                        {row.data.category || "-"}
                      </td>

                      {/* ISBN */}

                      <td className="px-3 py-3 font-mono text-[11px] text-[var(--text-secondary)]">
                        {row.data.isbn || "-"}
                      </td>

                      {/* COPIES */}

                      <td className="px-3 py-3 text-[var(--text-primary)]">
                        {row.data.totalCopies ?? "-"}
                      </td>

                      {/* PRICE */}

                      <td className="px-3 py-3 text-[var(--text-primary)]">
                        {row.data.price !== undefined
                          ? `₹${row.data.price}`
                          : "-"}
                      </td>

                      {/* STATUS */}

                      <td className="px-3 py-3">
                        {row.valid ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-500">
                            <CheckCircle size={13} />
                            Valid
                          </span>
                        ) : (
                          <div className="max-w-[160px]">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-500">
                              <AlertCircle size={13} />
                              Invalid
                            </span>

                            {row.errors.length > 0 && (
                              <p
                                className="mt-1.5 truncate text-[10px] leading-4 text-red-400"
                                title={row.errors.join(", ")}
                              >
                                {row.errors.join(", ")}
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scroll hint */}

            <div className="border-t border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-[10px] text-[var(--text-secondary)]">
              Scroll horizontally to view all columns.
            </div>
          </div>

          {/* ==========================================
              PREVIEW FOOTER
              ========================================== */}

          <div className="mt-5 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[var(--text-secondary)]">
              {previewData.validRows > 0
                ? `${previewData.validRows} valid book${
                    previewData.validRows !== 1 ? "s" : ""
                  } ready to import.`
                : "No valid books available for import."}
            </p>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancelPreview}
                disabled={importBooks.isPending}
                className="rounded-lg px-5"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleImport}
                loading={importBooks.isPending}
                disabled={importBooks.isPending || previewData.validRows === 0}
                className="rounded-lg px-5"
              >
                Import {previewData.validRows} Books
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  // ==========================================
  // NORMAL ADD BOOK SCREEN
  // ==========================================

  return (
    <Modal onClose={onClose}>
      <p className="-mt-2 mb-6 text-sm text-[var(--text-secondary)]">
        Add a single book manually or use the bulk import option.
      </p>

      {/* ==========================================
          BULK IMPORT CARD
          ========================================== */}

      <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <FileSpreadsheet size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Bulk Import
            </h3>

            <p className="text-xs text-[var(--text-secondary)]">
              Upload an Excel file to import multiple books at once.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <Button
            type="button"
            onClick={handleUploadClick}
            loading={preview.isPending}
            disabled={preview.isPending}
            className="rounded-lg px-4 text-xs"
          >
            <Upload size={14} className="mr-1.5 inline" />

            {preview.isPending ? "Processing..." : "Upload Excel"}
          </Button>

          <button
            type="button"
            onClick={handleDownloadTemplate}
            disabled={preview.isPending}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={14} />
            Download Template
          </button>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            disabled={preview.isPending}
          />
        </div>
      </div>

      {/* ==========================================
          DIVIDER
          ========================================== */}

      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>

        <span className="relative bg-[var(--bg-sidebar)] px-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          Or Enter Manually
        </span>
      </div>

      {/* ==========================================
          MANUAL FORM
          ========================================== */}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          {/* BOOK NAME */}

          <div>
            <label className={labelClass}>Book Name *</label>

            <input
              required
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="e.g. Clean Code"
              className={inputClass}
            />
          </div>

          {/* AUTHOR */}

          <div>
            <label className={labelClass}>Author *</label>

            <input
              required
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Robert C. Martin"
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
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* ==========================================
            FOOTER
            ========================================== */}

        <div className="mt-6 flex justify-end gap-3 border-t border-[var(--border)] pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={createBookMutation.isPending || preview.isPending}
            className="rounded-lg px-5"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={createBookMutation.isPending}
            disabled={preview.isPending}
            className="rounded-lg px-5"
          >
            Save Book
          </Button>
        </div>
      </form>
    </Modal>
  );
}
