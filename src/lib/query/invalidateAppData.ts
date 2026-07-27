import { QueryClient } from "@tanstack/react-query";

import { dashboardKeys } from "@/features/dashboard/hooks/dashboardKeys";
import { bookKeys } from "@/features/books/hooks/bookKeys";
import { studentKeys } from "@/features/students/hooks/studentKeys";
import { requestKeys } from "@/features/requests/hooks/requestKeys";
import { profileKeys } from "@/features/profile/hooks/profileKeys";

export const invalidateAppData = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: dashboardKeys.stats,
  });

  queryClient.invalidateQueries({
    queryKey: bookKeys.all,
  });

  queryClient.invalidateQueries({
    queryKey: studentKeys.all,
  });

  queryClient.invalidateQueries({
    queryKey: requestKeys.all,
  });
  queryClient.invalidateQueries({
    queryKey: profileKeys.profile,
  });
};
