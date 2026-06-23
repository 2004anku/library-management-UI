"use client";

// Next/React

import { useEffect, useState, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// Services
import {
  getAllStudents,
  deleteStudent,
  updateStudent,
} from "@/features/students/services/student.service";

// Components

import Sidebar from "@/components/dashboard/Sidebar";
import AddStudent from "@/app/students/AddStudent";
import EditStudent from "@/app/students/EditStudent";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import LoadingState from "@/components/ui/loadingState";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/ui/table/DataTable";
import TableHeader from "@/components/ui/page/TableHeader";
import TableColumns from "@/components/ui/table/TableColumns";
import TableActions from "@/components/ui/table/TableActions";
import { useRouter } from "next/navigation";
import { searchStudents } from "@/features/dashboard/services/dashboard.service";

// UI
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import type { Student } from "@/features/students/types/studentType";

// Utils
import { handleApiError } from "@/utils/errorHandler";
const columns = [
  { key: "id", label: "ID", width: "10%" },
  { key: "studentName", label: "Student Name", width: "20%" },
  { key: "course", label: "Course", width: "15%" },
  { key: "email", label: "Email", width: "25%" },
  { key: "phone", label: "Phone", width: "15%" },
  { key: "semester", label: "Semester", width: "10%" },
  { key: "action", label: "Action", width: "15%", align: "right" as const },
];

function StudentsContent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (loading) {
    return <LoadingState message="" />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }
  if (students.length === 0 && !loading) {
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
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const data = await searchStudents(value);

      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
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
        <TableHeader
          title="Students"
          action={
            <div className="flex gap-3">
              <div ref={searchRef} className="relative w-80">
                <input
                  type="text"
                  placeholder="Search student..."
                  value={search}
                  onChange={handleSearch}
                  className="
      w-full
      px-4 py-2
      rounded-xl
      bg-[var(--bg-card)]
      border border-[var(--border)]
    "
                />

                {searchResults.length > 0 && (
                  <div
                    className="
        absolute
        top-full
        mt-2
        w-full
        rounded-xl
        border border-[var(--border)]
        bg-[var(--bg-card)]
        z-50
      "
                  >
                    {searchResults.map((student) => (
                      <button
                        key={student._id}
                        onClick={() => {
                          router.push(`/students/${student._id}`);
                        }}
                        className="
            w-full
            text-left
            p-3
            hover:bg-[var(--table-hover)]
          "
                      >
                        <div className="font-medium">{student.studentName}</div>

                        <div className="text-xs text-gray-400">
                          {student.email}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button onClick={() => setShowAddModal(true)}>
                + Add Student
              </Button>
            </div>
          }
        />

        {/* TABLE */}
        <DataTable>
          <TableColumns columns={columns} />

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
                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-[var(--text-secondary)]"
                    >
                      No students found
                    </td>
                  </tr>
                )}

                <td className="p-4 text-right">
                  <TableActions>
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
                  </TableActions>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
        {showEditModal && selectedStudent && (
          <EditStudent
            student={selectedStudent}
            onClose={() => {
              setShowEditModal(false);
              setSelectedStudent(null);
            }}
            onSave={handleUpdate}
          />
        )}
        {showAddModal && (
          <AddStudent
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
