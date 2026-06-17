import api from "@/lib/axios/axios";
import { Student } from "../types/studentType";
export const getAllStudents = async () => {
  const response = await api.get("/admin/student/all-student");

  console.log("STUDENTS API RESPONSE:", response.data);

  return response.data.data;
};
export const deleteStudent = async (studentId: string) => {
  const response = await api.delete(
    `/admin/student/remove-student/${studentId}`,
  );

  return response.data;
};
export const updateStudent = async (
  studentId: string,
  data: Partial<Student> & { password?: string },
) => {
  const response = await api.patch(
    `/admin/student/update-student/${studentId}`,
    data,
  );

  return response.data.data;
};
export const createStudent = async (studentData: {
  studentName: string;
  email: string;
  password: string;
  phone: string;
  course: string;
  semester: number;
}) => {
  const response = await api.post("/admin/student/create-student", studentData);

  return response.data.data;
};
