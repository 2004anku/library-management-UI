import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createStudent } from "../services/student.service";
import { studentKeys } from "./studentKeys";
import { handleApiError } from "@/utils/errorHandler";

type CreateStudentPayload = {
  studentName: string;
  email: string;
  password: string;
  phone: string;
  course: string;
  semester: number;
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentData: CreateStudentPayload) =>
      createStudent(studentData),

    onSuccess: () => {
      toast.success("Student created successfully");

      queryClient.invalidateQueries({
        queryKey: studentKeys.all,
      });
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
