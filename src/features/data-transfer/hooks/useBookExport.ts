import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { exportBooks } from "../services/dataTransfer.service";
import { handleApiError } from "@/utils/errorHandler";

export const useBookExport = () => {
  return useMutation({
    mutationFn: exportBooks,

    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "Books.xlsx";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Books exported successfully");
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
