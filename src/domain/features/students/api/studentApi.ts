import api from "@/lib/axios";

export const getAllStudents = async () => {
  const response = await api.get("/api/v1/admin/students");

  return response.data;
};
