import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { acceptReturnRequest } from "../services/request.service";
import { requestKeys } from "./requestKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useAcceptReturnRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptReturnRequest,

    onSuccess: () => {
      toast.success("Book returned successfully");

      invalidateAppData(queryClient);
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
