import api from "@/lib/axios";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await api.post("/admin/auth/login", data);
  return response.data;
};
