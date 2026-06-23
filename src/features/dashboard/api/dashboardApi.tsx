import api from "@/lib/axios/axios";

export const getDashboardStatsApi = async () => {
  return await api.get("/admin/dashboard/stats");
};

export const searchStudentsApi = async (query: string) => {
  return await api.get(`/admin/dashboard/search-students?q=${query}`);
};
