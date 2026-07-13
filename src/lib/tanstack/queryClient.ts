import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 5 minutes
      staleTime: 1000 * 60 * 5,

      // Cache kept for 10 minutes after last use
      gcTime: 1000 * 60 * 10,

      // Retry failed requests once
      retry: 1,

      // Refresh stale data when user returns to the tab
      refetchOnWindowFocus: true,

      // Refresh when internet reconnects
      refetchOnReconnect: true,

      // Refresh when app remounts if data is stale
      refetchOnMount: true,
    },

    mutations: {
      retry: 1,
    },
  },
});
