"use client";

// Next/React
import { Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useStudents } from "@/features/students/hooks/useStudents";
import { useDeleteStudent } from "@/features/students/hooks/useDeleteStudent";
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
import ArchiveStudent from "@/app/students/ArchiveStudent";

// UI
import ErrorState from "@/components/ui/errorState";
import EmptyState from "@/components/ui/emptyState";
import type { Student } from "@/features/students/types/studentType";

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
  const { data: students = [], isLoading: loading, error } = useStudents();

  const deleteStudentMutation = useDeleteStudent();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const filteredStudents = students.filter(
    (student: Student) =>
      student.studentName.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.course.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
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
  if (loading) return <LoadingState message="" />;
  if (error) return <ErrorState message="Failed to load students." />;
  if (!students.length) return <EmptyState message="No students found." />;

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
                    {searchResults.map((student: Student) => (
                      <button
                        key={student._id}
                        onClick={() => router.push(`/students/${student._id}`)}
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
              <Button onClick={() => setShowArchiveModal(true)}>
                Archived Students
              </Button>
            </div>
          }
        />
        {/* TABLE */}
        <DataTable>
          <TableColumns columns={columns} />

          <tbody className="divide-y divide-[var(--border)]">
            {filteredStudents.map((student: Student, index: number) => (
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

                <td className="p-4 text-right">
                  <TableActions>
                    <button
                      onClick={() => handleEdit(student)}
                      className="p-2 rounded-lg hover:bg-[var(--success)]/20 transition-all duration-200"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm("Delete this student?")) {
                          deleteStudentMutation.mutate(student._id);
                        }
                      }}
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
          />
        )}
        {showAddModal && <AddStudent onClose={() => setShowAddModal(false)} />}{" "}
        {showArchiveModal && (
          <ArchiveStudent onClose={() => setShowArchiveModal(false)} />
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
