"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  getAllStudents,
  deleteStudent,
  updateStudent,
} from "@/domain/features/students/services/student.service";

import EditStudentModal from "@/components/students/EditStudentModel";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import { handleApiError } from "@/utils/errorHandler";
import type { Student } from "@/domain/features/students/types/studentType";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";

function StudentsContent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllStudents();

      setStudents(data);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  if (loading) {
    return <LoadingState message="" />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (students.length === 0) {
    return <EmptyState message="No students found." />;
  }

  const handleDelete = async (studentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    try {
      await deleteStudent(studentId);

      await fetchStudents();
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);

    setShowEditModal(true);
  };

  const handleUpdate = async (
    data: Partial<Student> & { password?: string },
  ) => {
    if (!selectedStudent) return;

    try {
      await updateStudent(selectedStudent._id, data);

      setShowEditModal(false);

      setSelectedStudent(null);

      await fetchStudents();
    } catch (error) {
      alert(handleApiError(error));
    }
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="heading-font text-3xl font-bold">Students</h1>

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
                <th className="p-4 text-right text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Action
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
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="px-3 py-1 rounded-lg hover:bg-[var(--success)] transition-all duration-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-3 py-1 rounded-lg hover:bg-[var(--danger)] transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showEditModal && selectedStudent && (
          <EditStudentModal
            student={selectedStudent}
            onClose={() => {
              setShowEditModal(false);
              setSelectedStudent(null);
            }}
            onSave={handleUpdate}
          />
        )}
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
