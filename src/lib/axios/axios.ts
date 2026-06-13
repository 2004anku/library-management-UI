import axios from "axios";
import { storage } from "@/utils/storage";
import { loadingStore } from "@/lib/loading/loadingStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // show loader
  loadingStore.show();

  // artificial delay
  await new Promise((res) => setTimeout(res, 1500));

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    loadingStore.hide();
    return response;
  },
  (error) => {
    loadingStore.hide();
    return Promise.reject(error);
  },
);

export default api;
