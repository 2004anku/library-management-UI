"use client";

import { useRef, useState } from "react";
import { Download, FileSpreadsheet, Upload } from "lucide-react";

import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/model/model";

import { useCreateStudent } from "@/features/students/hooks/useCreateStudent";
import { useStudentImport } from "@/features/data-transfer/hooks/useStudentImport";

import { capitalizeWords, formatPhoneNumber } from "../../utils/formatText";

type Props = {
  onClose: () => void;
};

type PreviewRow = {
  rowNumber: number;
  data: {
    studentName?: string;
    email?: string;
    password?: string;
    phone?: string;
    course?: string;
    semester?: number | string;
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

export default function AddStudentModal({ onClose }: Props) {
  const createStudentMutation = useCreateStudent();
  const studentImport = useStudentImport();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    password: "",
    phone: "",
    course: "",
    semester: 1,
  });

  // ==========================================
  // EXCEL PREVIEW STATE
  // ==========================================

  const [previewData, setPreviewData] = useState<PreviewResponse | null>(null);

  // ==========================================
  // MANUAL INPUT
  // ==========================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "semester" ? Number(value) : value,
    }));
  };

  // ==========================================
  // MANUAL STUDENT CREATE
  // ==========================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createStudentMutation.mutateAsync({
      ...formData,
      studentName: capitalizeWords(formData.studentName),
      course: capitalizeWords(formData.course),
      phone: formatPhoneNumber(formData.phone),
    });

    onClose();
  };

  // ==========================================
  // OPEN FILE PICKER
  // ==========================================

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ==========================================
  // EXCEL FILE SELECT
  // ==========================================

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate extension
    const allowedExtensions = [".xlsx", ".xls"];

    const fileName = file.name.toLowerCase();

    const isExcelFile = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isExcelFile) {
      alert("Please select a valid Excel file (.xlsx or .xls)");

      e.target.value = "";

      return;
    }

    try {
      // ==========================================
      // SEND FILE TO PREVIEW API
      // ==========================================

      const response = await studentImport.preview.mutateAsync(file);

      setPreviewData(response);

      console.log("Student Excel preview:", response);
    } catch (error) {
      console.error("Student Excel preview failed:", error);
    }
  };

  // ==========================================
  // IMPORT PREVIEWED STUDENTS
  // ==========================================

  const handleImport = async () => {
    if (!previewData) return;

    try {
      await studentImport.importStudents.mutateAsync(previewData.data);

      setPreviewData(null);

      // Reset file input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onClose();
    } catch (error) {
      console.error("Student import failed:", error);
    }
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
    const headers = "Student Name,Email,Password,Phone,Course,Semester\n";

    const example =
      "Alex Johnson,alex.j@university.edu,Password123,+919876543210,Computer Science,1\n";

    const csvContent = headers + example;

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "student-import-template.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // STYLES
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
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Review Student Import
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Review the Excel data before importing students.
            </p>
          </div>

          {/* SUMMARY */}

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3">
              <p className="text-xs text-[var(--text-secondary)]">Total</p>

              <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                {previewData.totalRows}
              </p>
            </div>

            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
              <p className="text-xs text-green-500">Valid</p>

              <p className="mt-1 text-lg font-semibold text-green-500">
                {previewData.validRows}
              </p>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
              <p className="text-xs text-red-500">Invalid</p>

              <p className="mt-1 text-lg font-semibold text-red-500">
                {previewData.invalidRows}
              </p>
            </div>
          </div>

          {/* PREVIEW TABLE */}

          <div className="max-h-[400px] overflow-auto rounded-lg border border-[var(--border)]">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-[var(--bg-card)]">
                <tr className="border-b border-[var(--border)]">
                  <th className="px-3 py-3">Row</th>
                  <th className="px-3 py-3">Student</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Course</th>
                  <th className="px-3 py-3">Semester</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {previewData.data.map((row) => (
                  <tr
                    key={row.rowNumber}
                    className="border-b border-[var(--border)]"
                  >
                    <td className="px-3 py-3">{row.rowNumber}</td>

                    <td className="px-3 py-3">{row.data.studentName}</td>

                    <td className="px-3 py-3">{row.data.email}</td>

                    <td className="px-3 py-3">{row.data.course}</td>

                    <td className="px-3 py-3">{row.data.semester}</td>

                    <td className="px-3 py-3">
                      {row.valid ? (
                        <span className="font-medium text-green-500">
                          Valid
                        </span>
                      ) : (
                        <div>
                          <span className="font-medium text-red-500">
                            Invalid
                          </span>

                          {row.errors.length > 0 && (
                            <div className="mt-1 text-[10px] text-red-400">
                              {row.errors.join(", ")}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-3 border-t border-[var(--border)] pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancelPreview}
              className="rounded-lg px-5"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleImport}
              loading={studentImport.importStudents.isPending}
              disabled={previewData.validRows === 0}
              className="rounded-lg px-5"
            >
              Import {previewData.validRows} Students
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  // ==========================================
  // NORMAL ADD STUDENT SCREEN
  // ==========================================

  return (
    <Modal onClose={onClose}>
      <div className="mb-6">
        <p className="text-sm text-[var(--text-secondary)]">
          Add a single student manually below or import multiple students from
          Excel.
        </p>
      </div>

      {/* ======================================
          BULK IMPORT
      ====================================== */}

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
              Add multiple students using an Excel file.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <Button
            type="button"
            onClick={handleUploadClick}
            loading={studentImport.preview.isPending}
            className="rounded-lg px-4 text-xs"
          >
            <Upload size={14} className="mr-1.5 inline" />
            Upload Excel
          </Button>

          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition hover:bg-white/5"
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
          />
        </div>
      </div>

      {/* ======================================
          DIVIDER
      ====================================== */}

      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>

        <span className="relative bg-[var(--bg-sidebar)] px-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          Or Enter Manually
        </span>
      </div>

      {/* ======================================
          MANUAL FORM
      ====================================== */}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          {/* STUDENT NAME */}

          <div>
            <label className={labelClass}>Student Name *</label>

            <input
              required
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="e.g. Alex Johnson"
              className={inputClass}
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className={labelClass}>Email Address *</label>

            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex.j@university.edu"
              className={inputClass}
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className={labelClass}>Password *</label>

            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {/* PHONE */}

          <div>
            <label className={labelClass}>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+919876543210"
              className={inputClass}
            />
          </div>

          {/* COURSE */}

          <div>
            <label className={labelClass}>Course / Major *</label>

            <input
              required
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Computer Science"
              className={inputClass}
            />
          </div>

          {/* SEMESTER */}

          <div>
            <label className={labelClass}>Semester *</label>

            <input
              required
              type="number"
              min="1"
              max="12"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* FOOTER */}

        <div className="mt-6 flex justify-end gap-3 border-t border-[var(--border)] pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="rounded-lg px-5"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={createStudentMutation.isPending}
            className="rounded-lg px-5"
          >
            Save Student
          </Button>
        </div>
      </form>
    </Modal>
  );
}
