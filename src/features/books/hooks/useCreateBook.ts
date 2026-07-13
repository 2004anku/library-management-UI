import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bookKeys } from "./bookKeys";
import { createBook } from "../services/book.service";
import type { CreateBookPayload } from "../types/bookType";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { handleApiError } from "@/utils/errorHandler";

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookData: CreateBookPayload) => createBook(bookData),

    onSuccess: () => {
      toast.success("Book created successfully");

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
