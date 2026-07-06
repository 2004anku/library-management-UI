"use client";

import { useState } from "react";
import type { Student } from "@/features/students/types/studentType";
import { useUpdateStudent } from "@/features/students/hooks/useUpdateStudent";
import Button from "@/components/ui/button/Button";

type Props = {
  student: Student;
  onClose: () => void;
};

export default function EditStudentModal({ student, onClose }: Props) {
  const updateStudentMutation = useUpdateStudent();

  const [formData, setFormData] = useState({
    studentName: student.studentName,
    email: student.email,
    phone: student.phone,
    course: student.course,
    semester: student.semester,
    fine: student.fine,
    status: student.status,
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "semester" || name === "fine" ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    const payload: Partial<Student> & { password?: string } = {
      studentName: formData.studentName,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      semester: formData.semester,
      fine: formData.fine,
      status: formData.status as "active" | "inactive",
    };

    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    await updateStudentMutation.mutateAsync({
      studentId: student._id,
      data: payload,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-[var(--bg-sidebar)] border border-[var(--border)] p-6">
        <h2 className="heading-font text-2xl font-bold mb-6">Edit Student</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Student Name
            </label>

            <input
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Email Address
            </label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Phone Number
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Course
            </label>

            <input
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Semester
            </label>

            <input
              type="number"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Fine Amount
            </label>

            <input
              type="number"
              name="fine"
              value={formData.fine}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              New Password (Optional)
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-[var(--border)]"
          >
            Cancel
          </button>

          <Button
            loading={updateStudentMutation.isPending}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
