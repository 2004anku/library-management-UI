import api from "@/lib/axios/axios";
import { UpdateProfilePayload } from "../types/profileType";

export const getProfileApi = async () => {
  const response = await api.get("/library-admin/users/profile");

  return response.data;
};

export const updateProfileApi = async (data: UpdateProfilePayload) => {
  const response = await api.patch("/library-admin/users/profile", data);

  return response.data;
};
