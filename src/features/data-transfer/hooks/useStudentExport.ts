import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { exportStudents } from "../services/dataTransfer.service";
import { handleApiError } from "@/utils/errorHandler";

export const useStudentExport = () => {
  return useMutation({
    mutationFn: exportStudents,

    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "Students.xlsx";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Students exported successfully");
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
