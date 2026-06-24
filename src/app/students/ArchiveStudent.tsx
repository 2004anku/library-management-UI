"use client";

import { useEffect, useState } from "react";
import { X, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

import {
  getArchivedStudents,
  restoreStudent,
} from "@/features/students/services/student.service";
import type { Student } from "@/features/students/types/studentType";
import { handleApiError } from "@/utils/errorHandler";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function ArchiveStudent({ onClose, onSuccess }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArchivedStudents = async () => {
    try {
      setLoading(true);

      const data = await getArchivedStudents();
      setStudents(data);
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedStudents();
  }, []);

  const handleRestore = async (studentId: string) => {
    try {
      await restoreStudent(studentId);

      toast.success("Student restored successfully");

      await fetchArchivedStudents();
      onSuccess();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-card)] w-[700px] rounded-2xl p-5 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Archived Students</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-400">No archived students found</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-auto">
            {students.map((student) => (
              <div
                key={student._id}
                className="flex justify-between items-center p-3 border border-[var(--border)] rounded-xl"
              >
                <div>
                  <p className="font-medium">{student.studentName}</p>
                  <p className="text-xs text-gray-400">{student.email}</p>
                </div>

                <button
                  onClick={() => handleRestore(student._id)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/30"
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
