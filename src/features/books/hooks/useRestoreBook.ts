import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bookKeys } from "./bookKeys";
import { restoreBook } from "../services/book.service";
import { handleApiError } from "@/utils/errorHandler";
import { invalidateAppData } from "@/lib/query/invalidateAppData";

export const useRestoreBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreBook,

    onSuccess: () => {
      toast.success("Book restored successfully");

      invalidateAppData(queryClient, {
        books: true,
        dashboard: true,
      });

      queryClient.invalidateQueries({
        queryKey: bookKeys.archived,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
