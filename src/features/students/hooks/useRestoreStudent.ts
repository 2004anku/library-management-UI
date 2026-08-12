import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { restoreStudent } from "../services/student.service";
import { studentKeys } from "./studentKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useRestoreStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreStudent,

    onSuccess: () => {
      toast.success("Student restored successfully");

      invalidateAppData(queryClient);

      queryClient.invalidateQueries({
        queryKey: studentKeys.archived,
      });
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
