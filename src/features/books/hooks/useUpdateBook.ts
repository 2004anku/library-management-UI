import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bookKeys } from "./bookKeys";
import { updateBook } from "../services/book.service";
import { handleApiError } from "@/utils/errorHandler";
import type { Book } from "../types/bookType";

type UpdateBookPayload = {
  bookId: string;
  bookData: Partial<Book>;
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, bookData }: UpdateBookPayload) =>
      updateBook(bookId, bookData),

    onSuccess: () => {
      toast.success("Book updated successfully");
      queryClient.invalidateQueries({
        queryKey: bookKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
