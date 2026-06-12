import axios from "axios";
import { storage } from "@/utils/storage";
import { handleApiError } from "@/utils/errorHandler";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    handleApiError(error);

    return Promise.reject(error);
  },
);

export default api;
