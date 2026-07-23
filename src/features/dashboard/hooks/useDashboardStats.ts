import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "../services/dashboard.service";
import { dashboardKeys } from "./dashboardKeys";

// ==========================================
// DASHBOARD STATS
// ==========================================
export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats,

    queryFn: getDashboardStats,

    // Keep previous data while refetching
    placeholderData: (previousData) => previousData,

    // Refetch automatically when window regains focus
    refetchOnWindowFocus: true,
  });
};
