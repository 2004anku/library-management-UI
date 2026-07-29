import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { loginUser } from "../services/auth.service";
import { handleApiError } from "@/utils/errorHandler";

import { invalidateAppData } from "@/lib/query/invalidateAppData";
import { profileKeys } from "@/features/profile/hooks/profileKeys";

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),

    onSuccess: async () => {
      // Force profile to refetch for the newly logged-in admin
      await queryClient.invalidateQueries({
        queryKey: profileKeys.profile,
      });

      invalidateAppData(queryClient);

      toast.success("Login successful");
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
