import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteStudent } from "../services/student.service";
import { studentKeys } from "./studentKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,

    onSuccess: () => {
      toast.success("Student deleted successfully");

      queryClient.invalidateQueries({
        queryKey: studentKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
