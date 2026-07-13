import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { deleteRequest } from "../services/request.service";
import { requestKeys } from "./requestKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,

    onSuccess: () => {
      toast.success("Request deleted successfully");

      invalidateAppData(queryClient, {
        requests: true,
        dashboard: true,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
