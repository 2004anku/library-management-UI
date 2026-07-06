import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bookKeys } from "./bookKeys";
import { createBook } from "../services/book.service";
import type { CreateBookPayload } from "../types/bookType";

import { handleApiError } from "@/utils/errorHandler";

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookData: CreateBookPayload) => createBook(bookData),

    onSuccess: () => {
      toast.success("Book created successfully");

      queryClient.invalidateQueries({
        queryKey: bookKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
