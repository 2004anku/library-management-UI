"use client";

import { useState } from "react";

import type { Student } from "@/features/students/types/studentType";
import type { Book } from "@/features/books/types/bookType";

import { useAssignBook } from "@/features/requests/hooks/useAssignBook";
import { capitalizeWords } from "@/utils/formatText";
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
      <div className="bg-[var(--bg-card)] rounded-2xl p-6 w-full max-w-xl border border-[var(--border)]">
        <h2 className="text-xl font-bold mb-5">Assign Book</h2>

        <div className="space-y-5">
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className=" w-full
    p-3
    rounded-xl
    border border-[var(--border)]
    bg-[var(--bg-card)]
    text-[var(--text-primary)]
    appearance-none
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--primary)]"
          >
            <option
              value=""
              className="bg-[var(--bg-card)] text-[var(--text-primary)]"
            >
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
                className="bg-[var(--bg-card)] text-[var(--text-primary)]"
              >
                {capitalizeWords(student.studentName)} •{" "}
                {capitalizeWords(student.course)} • Sem {student.semester}
              </option>
            ))}
          </select>

          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-transparent"
          >
            <option
              value=""
              className="bg-[var(--bg-card)] text-[var(--text-primary)]"
            >
              Select Book
            </option>
            {books
              .filter((book) => book.availableCopies > 0)
              .map((book) => (
                <option
                  key={book._id}
                  value={book._id}
                  className="bg-[var(--bg-card)] text-[var(--text-primary)]"
                >
                  {capitalizeWords(book.bookName)}
                  {capitalizeWords(book.author)}({book.availableCopies}{" "}
                  Available)
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

          <Button
            loading={assignBookMutation.isPending}
            onClick={handleAssign}
            disabled={!studentId || !bookId}
          >
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
}
