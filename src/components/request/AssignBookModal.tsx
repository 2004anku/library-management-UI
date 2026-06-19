"use client";

import { useState } from "react";
import type { Student } from "@/domain/features/students/types/studentType";
import type { Book } from "@/domain/features/books/types/bookType";
import { assignBook } from "@/domain/features/requests/services/request.service";
import toast from "react-hot-toast";
import { handleApiError } from "@/utils/errorHandler";

type AssignBookModalProps = {
  students: Student[];
  books: Book[];
  onClose: () => void;
  onSuccess: () => void;
};

export default function AssignBookModal({
  students,
  books,
  onClose,
  onSuccess,
}: AssignBookModalProps) {
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!studentId || !bookId) {
      toast.error("Please select student and book");
      return;
    }

    try {
      setLoading(true);

      await assignBook({
        studentId,
        bookId,
        dueDate: dueDate || undefined,
      });

      toast.success("Book assigned successfully");

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {" "}
      <div className="bg-[var(--bg-card)] rounded-2xl p-6 w-full max-w-md border border-[var(--border)]">
        {" "}
        <h2 className="text-xl font-bold mb-5">Assign Book</h2>
        <div className="space-y-4">
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-transparent"
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.studentName}
              </option>
            ))}
          </select>

          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-transparent"
          >
            <option value="">Select Book</option>

            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.bookName}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-transparent"
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[var(--border)]"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-[var(--primary)]"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}
