"use client";

import { useState } from "react";

import type { Student } from "@/features/students/types/studentType";
import type { Book } from "@/features/books/types/bookType";

import { useAssignBook } from "@/features/requests/hooks/useAssignBook";

import Button from "@/components/ui/button/Button";

type AssignBookModalProps = {
  students: Student[];
  books: Book[];
  onClose: () => void;
};

export default function AssignBookModal({
  students,
  books,
  onClose,
}: AssignBookModalProps) {
  const assignBookMutation = useAssignBook();

  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAssign = () => {
    if (!studentId || !bookId) return;

    assignBookMutation.mutate(
      {
        studentId,
        bookId,
        dueDate: dueDate || undefined,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-card)] rounded-2xl p-6 w-full max-w-md border border-[var(--border)]">
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

          <Button loading={assignBookMutation.isPending} onClick={handleAssign}>
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
}
