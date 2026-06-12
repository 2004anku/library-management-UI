import api from "@/lib/axios";

export const getDashboardStatsApi = async () => {
  const response = await api.get("/admin/dashboard/stats");

  return response.data.data;
};
