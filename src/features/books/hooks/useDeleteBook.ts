import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../services/book.service";
import toast from "react-hot-toast";
import { handleApiError } from "@/utils/errorHandler";
import { bookKeys } from "./bookKeys";
export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,

    onSuccess: () => {
      toast.success("Book deleted successfully");

      queryClient.invalidateQueries({
        queryKey: bookKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
