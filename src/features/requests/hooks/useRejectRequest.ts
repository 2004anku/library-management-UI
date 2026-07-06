import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { rejectRequest } from "../services/request.service";
import { requestKeys } from "./requestKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useRejectRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectRequest,

    onSuccess: () => {
      toast.success("Request rejected successfully");

      queryClient.invalidateQueries({
        queryKey: requestKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
