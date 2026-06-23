import { loginApi } from "../api/authApi";
import { storage } from "@/utils/storage";

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await loginApi(data);

  storage.setToken(response.token);
  storage.setUser(response.data);

  return response;
};

export const logoutUser = () => {
  storage.clearAuth();
};

export const isAuthenticated = () => {
  return !!storage.getToken();
};
