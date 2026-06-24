import api from "@/lib/axios/axios";

export const getAllStudentsApi = async () => {
  return await api.get("/admin/student/all-student");
};

export const deleteStudentApi = async (studentId: string) => {
  return await api.delete(`/admin/student/remove-student/${studentId}`);
};

export const updateStudentApi = async (studentId: string, data: any) => {
  return await api.patch(`/admin/student/update-student/${studentId}`, data);
};

export const createStudentApi = async (studentData: any) => {
  return await api.post("/admin/student/create-student", studentData);
};

export const getSingleStudentApi = async (studentId: string) => {
  return await api.get(`/admin/student/single-student/${studentId}`);
};

export const getStudentProfileApi = async (studentId: string) => {
  return await api.get(`/admin/student/profile/${studentId}`);
};
export const getArchivedStudentsApi = async () => {
  return await api.get("/admin/student/archived-students");
};

export const restoreStudentApi = async (studentId: string) => {
  return await api.patch(`/admin/student/restore-student/${studentId}`);
};
