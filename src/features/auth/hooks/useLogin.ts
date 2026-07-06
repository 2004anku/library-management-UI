import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { loginUser } from "../services/auth.service";
import { handleApiError } from "@/utils/errorHandler";

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),

    onSuccess: () => {
      toast.success("Login successful");
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
