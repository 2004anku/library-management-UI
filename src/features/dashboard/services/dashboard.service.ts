import { getDashboardStatsApi, searchStudentsApi } from "../api/dashboardApi";

export const getDashboardStats = async () => {
  const response = await getDashboardStatsApi();

  return response.data.data;
};

export const searchStudents = async (query: string) => {
  const response = await searchStudentsApi(query);

  return response.data.data;
};
