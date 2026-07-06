"use client";

import { X, RotateCcw } from "lucide-react";

import { useArchivedStudents } from "@/features/students/hooks/useArchivedStudents";
import { useRestoreStudent } from "@/features/students/hooks/useRestoreStudent";
import type { Student } from "@/features/students/types/studentType";

type Props = {
  onClose: () => void;
};

export default function ArchiveStudent({ onClose }: Props) {
  const { data: students = [], isLoading } = useArchivedStudents();

  const restoreStudentMutation = useRestoreStudent();

  const handleRestore = async (studentId: string) => {
    await restoreStudentMutation.mutateAsync(studentId);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-card)] w-[700px] rounded-2xl p-5 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Archived Students</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-400">No archived students found.</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-auto">
            {students.map((student: Student) => (
              <div
                key={student._id}
                className="flex justify-between items-center p-3 border border-[var(--border)] rounded-xl"
              >
                <div>
                  <p className="font-medium">{student.studentName}</p>

                  <p className="text-xs text-gray-400">{student.email}</p>
                </div>

                <button
                  disabled={restoreStudentMutation.isPending}
                  onClick={() => handleRestore(student._id)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50"
                >
                  <RotateCcw size={16} />
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
