import { useQuery } from "@tanstack/react-query";

import { dashboardKeys } from "./dashboardKeys";
import { getDashboardCharts } from "../services/dashboard.service";

export const useDashboardCharts = () => {
  return useQuery({
    queryKey: dashboardKeys.charts,
    queryFn: getDashboardCharts,
  });
};
