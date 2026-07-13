import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bookKeys } from "./bookKeys";
import { updateBook } from "../services/book.service";
import { handleApiError } from "@/utils/errorHandler";
import type { Book } from "../types/bookType";
import { invalidateAppData } from "@/lib/query/invalidateAppData";

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

      invalidateAppData(queryClient, {
        books: true,
        dashboard: true,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
