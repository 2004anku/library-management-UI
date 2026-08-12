import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  previewStudents,
  importStudents,
} from "../services/dataTransfer.service";

import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { handleApiError } from "@/utils/errorHandler";

export const useStudentImport = () => {
  const queryClient = useQueryClient();

  const previewMutation = useMutation({
    mutationFn: (file: File) => previewStudents(file),

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });

  const importMutation = useMutation({
    mutationFn: (data: unknown[]) => importStudents(data),

    onSuccess: (response) => {
      toast.success(
        `${response.summary.inserted} students imported successfully`,
      );

      invalidateAppData(queryClient);
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });

  return {
    preview: previewMutation,
    importStudents: importMutation,
  };
};
