import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { Request } from "../types/requestTypes";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { approveRequest } from "../services/request.service";
import { requestKeys } from "./requestKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useApproveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveRequest,

    // Optimistic Update
    onMutate: async (issueId: string) => {
      await queryClient.cancelQueries({
        queryKey: requestKeys.all,
      });

      const previousRequests = queryClient.getQueryData<Request[]>(
        requestKeys.all,
      );

      queryClient.setQueryData<Request[]>(requestKeys.all, (old) => {
        if (!old) return [];

        return old.map((request) =>
          request._id === issueId
            ? {
                ...request,
                status: "issued",
              }
            : request,
        );
      });

      return { previousRequests };
    },

    // Rollback
    onError: (error, _issueId, context) => {
      toast.error(handleApiError(error));

      if (context?.previousRequests) {
        queryClient.setQueryData(requestKeys.all, context.previousRequests);
      }
    },

    // Success
    onSuccess: () => {
      toast.success("Request approved successfully");

      invalidateAppData(queryClient, {
        requests: true,
        books: true,
        students: true,
        dashboard: true,
      });
    },

    // Sync with backend
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: requestKeys.all,
      });
    },
  });
};
