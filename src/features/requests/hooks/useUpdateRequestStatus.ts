import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateRequestStatus } from "../services/request.service";
import { requestKeys } from "./requestKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ issueId, status }: { issueId: string; status: string }) =>
      updateRequestStatus(issueId, status),

    onSuccess: () => {
      toast.success("Request updated successfully");

      queryClient.invalidateQueries({
        queryKey: requestKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
