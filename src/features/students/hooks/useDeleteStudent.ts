import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Student } from "../types/studentType";
import { deleteStudent } from "../services/student.service";
import { studentKeys } from "./studentKeys";
import { handleApiError } from "@/utils/errorHandler";

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,

    // 1. Optimistically update the UI
    onMutate: async (studentId: string) => {
      // Stop outgoing refetches
      await queryClient.cancelQueries({
        queryKey: studentKeys.all,
      });

      // Save previous cache
      const previousStudents = queryClient.getQueryData<Student[]>(
        studentKeys.all,
      );
      // Remove student immediately
      queryClient.setQueryData<Student[]>(studentKeys.all, (old) => {
        if (!old) return [];

        return old.filter((student) => student._id !== studentId);
      });

      // Return previous cache for rollback
      return { previousStudents };
    },

    // 2. Rollback if API fails
    onError: (error, _studentId, context) => {
      toast.error(handleApiError(error));

      if (context?.previousStudents) {
        queryClient.setQueryData(studentKeys.all, context.previousStudents);
      }
    },

    // 3. Success message
    onSuccess: () => {
      toast.success("Student deleted successfully");
    },

    // 4. Always sync with backend
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: studentKeys.all,
      });
    },
  });
};
