"use client";

// Next/React

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// Services
import {
  getAllStudents,
  deleteStudent,
  updateStudent,
} from "@/domain/features/students/services/student.service";

// Components

import Sidebar from "@/components/dashboard/Sidebar";
import AddStudentModal from "@/components/students/AddStudentModel";
import EditStudentModal from "@/components/students/EditStudentModel";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import LoadingState from "@/components/ui/loadingState";
import { Button } from "@/components/ui";
import SearchInput from "@/components/ui/SearchInput";
// UI
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import type { Student } from "@/domain/features/students/types/studentType";

// Utils
import { handleApiError } from "@/utils/errorHandler";

function StudentsContent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");

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

      toast.success("Student deleted successfully");

      await fetchStudents();
    } catch (error) {
      toast.error(handleApiError(error));
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

      toast.success("Student updated successfully");

      setShowEditModal(false);

      setSelectedStudent(null);

      await fetchStudents();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.studentName.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.course.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="heading-font text-3xl font-bold">Students</h1>

          <div className="flex gap-3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search students..."
            />
            <Button onClick={() => setShowAddModal(true)}>+ Add Student</Button>
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
              {filteredStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className="hover:bg-[var(--table-hover)] transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-mono text-[var(--text-secondary)]">
                    {index + 1}
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
                        className="p-2 rounded-lg hover:bg-[var(--success)]/20 transition-all duration-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="p-2 rounded-lg hover:bg-[var(--danger)]/20 transition-all duration-200"
                      >
                        <Trash2 size={18} />
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
        {showAddModal && (
          <AddStudentModal
            onClose={() => setShowAddModal(false)}
            onSuccess={fetchStudents}
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
