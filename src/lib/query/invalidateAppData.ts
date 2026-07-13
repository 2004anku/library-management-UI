import { QueryClient } from "@tanstack/react-query";

import { studentKeys } from "@/features/students/hooks/studentKeys";
import { bookKeys } from "@/features/books/hooks/bookKeys";
import { requestKeys } from "@/features/requests/hooks/requestKeys";
import { queryKeys } from "@/lib/tanstack/queryKeys";

type InvalidateOptions = {
  students?: boolean;
  books?: boolean;
  requests?: boolean;
  dashboard?: boolean;
};

export const invalidateAppData = (
  queryClient: QueryClient,
  options: InvalidateOptions,
) => {
  if (options.students) {
    queryClient.invalidateQueries({
      queryKey: studentKeys.all,
    });
  }

  if (options.books) {
    queryClient.invalidateQueries({
      queryKey: bookKeys.all,
    });
  }

  if (options.requests) {
    queryClient.invalidateQueries({
      queryKey: requestKeys.all,
    });
  }

  if (options.dashboard) {
    queryClient.invalidateQueries({
      queryKey: queryKeys.dashboard,
    });
  }
};
