import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "../services/dashboard.service";
import { dashboardKeys } from "./dashboardKeys";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats,

    queryFn: getDashboardStats,
  });
};
