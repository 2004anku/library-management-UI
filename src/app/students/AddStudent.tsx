"use client";

import { useState } from "react";
import Button from "@/components/ui/button/Button";
import { useCreateStudent } from "@/features/students/hooks/useCreateStudent";
import { capitalizeWords, formatPhoneNumber } from "../../utils/formatText";
type Props = {
  onClose: () => void;
};

export default function AddStudentModal({ onClose }: Props) {
  const createStudentMutation = useCreateStudent();

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    password: "",
    phone: "",
    course: "",
    semester: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "semester" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    await createStudentMutation.mutateAsync({
      ...formData,
      studentName: capitalizeWords(formData.studentName),
      course: capitalizeWords(formData.course),
      phone: formatPhoneNumber(formData.phone),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-sidebar)] rounded-2xl p-6 w-full max-w-lg border border-[var(--border)]">
        <h2 className="heading-font text-2xl font-bold mb-6">Add Student</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Student Name</label>
            <input
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+919876543210"
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div>
            <label className="text-sm">Course</label>
            <input
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            />
          </div>

          <div>
            <label className="text-sm">Semester</label>
            <input
              type="number"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
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
            loading={createStudentMutation.isPending}
            onClick={handleSubmit}
          >
            Save Student
          </Button>
        </div>
      </div>
    </div>
  );
}
