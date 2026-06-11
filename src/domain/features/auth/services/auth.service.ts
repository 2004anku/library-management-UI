import { loginApi } from "../api/authApi";
export const loginUser = async (data: { email: string; password: string }) => {
  const response = await loginApi(data);

  localStorage.setItem("token", response.token);

  localStorage.setItem("user", JSON.stringify(response.data));

  return response;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
