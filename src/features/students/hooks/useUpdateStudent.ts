import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateStudent } from "../services/student.service";
import { studentKeys } from "./studentKeys";
import { handleApiError } from "@/utils/errorHandler";
import type { Student } from "../types/studentType";

type UpdateStudentPayload = {
  studentId: string;
  data: Partial<Student> & {
    password?: string;
  };
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, data }: UpdateStudentPayload) =>
      updateStudent(studentId, data),

    onSuccess: () => {
      toast.success("Student updated successfully");

      queryClient.invalidateQueries({
        queryKey: studentKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
