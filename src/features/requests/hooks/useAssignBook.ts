import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { assignBook } from "../services/request.service";
import { requestKeys } from "./requestKeys";
import { handleApiError } from "@/utils/errorHandler";

type AssignBookPayload = {
  studentId: string;
  bookId: string;
  dueDate?: string;
};

export const useAssignBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignBookPayload) => assignBook(data),

    onSuccess: () => {
      toast.success("Book assigned successfully");

      invalidateAppData(queryClient, {
        requests: true,
        books: true,
        students: true,
        dashboard: true,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
