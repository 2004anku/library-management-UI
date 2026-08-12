import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { previewBooks, importBooks } from "../services/dataTransfer.service";

import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { handleApiError } from "@/utils/errorHandler";

export const useBookImport = () => {
  const queryClient = useQueryClient();

  // ==========================================
  // PREVIEW BOOKS
  // ==========================================

  const previewMutation = useMutation({
    mutationFn: (file: File) => previewBooks(file),

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });

  // ==========================================
  // IMPORT BOOKS
  // ==========================================

  const importMutation = useMutation({
    mutationFn: (data: unknown[]) => importBooks(data),

    onSuccess: (response) => {
      toast.success(`${response.summary.inserted} books imported successfully`);

      invalidateAppData(queryClient);
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });

  // ==========================================
  // RETURN
  // ==========================================

  return {
    preview: previewMutation,
    importBooks: importMutation,
  };
};
