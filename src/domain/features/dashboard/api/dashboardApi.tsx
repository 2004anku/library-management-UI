import api from "@/lib/axios/axios";

export const getDashboardStatsApi = async () => {
  const response = await api.get("/admin/dashboard/stats");

  return response.data.data;
};
