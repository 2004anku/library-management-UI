import api from "@/lib/axios/axios";

export const getProfileApi = async () => {
  const response = await api.get("/admin/users/profile");

  return response;
};
