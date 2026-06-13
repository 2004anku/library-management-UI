"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { getAllStudents } from "@/domain/features/students/services/student.service";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import { handleApiError } from "@/utils/errorHandler";
import type { Student } from "@/domain/features/students/types/studentType";

function StudentsContent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllStudents();

        console.log("STUDENTS DATA:", data);

        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);

        setError(handleApiError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl text-[var(--text-primary)]">
          Loading Students...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl text-[var(--danger)]">{error}</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Students</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search students..."
              className="
                w-full sm:w-64
                pl-4 pr-4 py-2
                bg-[var(--bg-card)]
                border border-[var(--border)]
                text-[var(--text-primary)]
                placeholder-[var(--text-secondary)]
                text-sm rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--primary)]
                focus:border-[var(--primary)]
                transition-all
              "
            />

            <button
              className="
                flex items-center justify-center gap-2
                bg-[var(--primary)]
                hover:bg-[var(--primary-hover)]
                text-[var(--text-primary)]
                px-5 py-2
                rounded-xl
                text-sm
                font-semibold
                transition-all duration-200
                hover:-translate-y-0.5
              "
            >
              + Add Student
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b border-[var(--border)]">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  ID
                </th>

                <th className="p-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Student Name
                </th>

                <th className="p-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Course
                </th>

                <th className="p-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Email
                </th>

                <th className="p-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Phone
                </th>

                <th className="p-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Semester
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-[var(--table-hover)] transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-mono text-[var(--text-secondary)]">
                    {student._id.slice(-6)}
                  </td>

                  <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                    {student.studentName}
                  </td>

                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {student.course}
                  </td>

                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {student.email}
                  </td>

                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {student.phone}
                  </td>

                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {student.semester}
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-[var(--text-secondary)]"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default function StudentsPage() {
  return (
    <ProtectedRoute>
      <StudentsContent />
    </ProtectedRoute>
  );
}
