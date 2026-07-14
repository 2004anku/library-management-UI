import {
  getDashboardStatsApi,
  searchStudentsApi,
  getDashboardChartsApi,
} from "../api/dashboardApi";
import { DashboardStats } from "../types/dashboardTypes";
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await getDashboardStatsApi();

  return response.data.data;
};

export const searchStudents = async (query: string) => {
  const response = await searchStudentsApi(query);

  return response.data.data;
};

export const getDashboardCharts = async () => {
  const response = await getDashboardChartsApi();

  return response.data.data;
};
