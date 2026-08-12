import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import type { Book } from "../types/bookType";
import { deleteBook } from "../services/book.service";
import { bookKeys } from "./bookKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,

    // Optimistic Update
    onMutate: async (bookId: string) => {
      await queryClient.cancelQueries({
        queryKey: bookKeys.all,
      });

      const previousBooks = queryClient.getQueryData<Book[]>(bookKeys.all);

      queryClient.setQueryData<Book[]>(bookKeys.all, (old) => {
        if (!old) return [];

        return old.filter((book) => book._id !== bookId);
      });

      return { previousBooks };
    },

    // Rollback
    onError: (error, _bookId, context) => {
      toast.error(handleApiError(error));

      if (context?.previousBooks) {
        queryClient.setQueryData(bookKeys.all, context.previousBooks);
      }
    },

    // Success
    onSuccess: () => {
      toast.success("Book deleted successfully");
    },

    // Sync with backend
    onSettled: () => {
      invalidateAppData(queryClient);
    },
  });
};
