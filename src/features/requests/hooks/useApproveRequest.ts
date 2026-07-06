import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { approveRequest } from "../services/request.service";
import { requestKeys } from "./requestKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useApproveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveRequest,

    onSuccess: () => {
      toast.success("Request approved successfully");

      queryClient.invalidateQueries({
        queryKey: requestKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
