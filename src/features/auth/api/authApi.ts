import api from "@/lib/axios/axios";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await api.post("/library-admin/auth/login", data);
  return response.data;
};
