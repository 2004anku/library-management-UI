import { Student } from "../types/studentType";

import {
  getAllStudentsApi,
  deleteStudentApi,
  updateStudentApi,
  createStudentApi,
  getSingleStudentApi,
  getStudentProfileApi,
  restoreStudentApi,
  getArchivedStudentsApi,
} from "../api/studentApi";

export const getAllStudents = async () => {
  const response = await getAllStudentsApi();

  return response.data.data;
};

export const deleteStudent = async (studentId: string) => {
  const response = await deleteStudentApi(studentId);

  return response.data;
};

export const updateStudent = async (
  studentId: string,
  data: Partial<Student> & { password?: string },
) => {
  const response = await updateStudentApi(studentId, data);

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
  const response = await createStudentApi(studentData);

  return response.data.data;
};

export const getSingleStudent = async (studentId: string) => {
  const response = await getSingleStudentApi(studentId);

  return response.data.data;
};

export const getStudentProfile = async (studentId: string) => {
  const response = await getStudentProfileApi(studentId);

  return response.data.data;
};
export const getArchivedStudents = async () => {
  const response = await getArchivedStudentsApi();
  return response.data.data;
};

export const restoreStudent = async (studentId: string) => {
  const response = await restoreStudentApi(studentId);
  return response.data;
};
