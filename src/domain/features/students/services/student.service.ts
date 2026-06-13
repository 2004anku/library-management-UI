import api from "@/lib/axios/axios";

export const getAllStudents = async () => {
  const response = await api.get("/admin/student/all-student");

  console.log("STUDENTS API RESPONSE:", response.data);

  return response.data.data;
};
