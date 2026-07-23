import {
  getDashboardStatsApi,
  searchStudentsApi,
  getDashboardChartsApi,
} from "../api/dashboardApi";

import { DashboardStats } from "../types/dashboardTypes";

// ==========================================
// DASHBOARD STATS
// ==========================================
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await getDashboardStatsApi();

  return response.data.data;
};

// ==========================================
// SEARCH STUDENTS
// ==========================================
export const searchStudents = async (query: string) => {
  const response = await searchStudentsApi(query);

  return response.data.data;
};

// ==========================================
// DASHBOARD CHARTS
// ==========================================
export const getDashboardCharts = async (): Promise<any> => {
  const response = await getDashboardChartsApi();

  return response.data.data;
};
