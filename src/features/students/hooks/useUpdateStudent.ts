import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { updateStudent } from "../services/student.service";
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

      invalidateAppData(queryClient, {
        students: true,
        dashboard: true,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
