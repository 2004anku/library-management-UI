"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateProfile } from "../services/profile.service";
import { profileKeys } from "./profileKeys";

import { storage } from "@/utils/storage";
import { handleApiError } from "@/utils/errorHandler";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (updatedProfile) => {
      /**
       * Update React Query Cache
       */
      queryClient.setQueryData(profileKeys.profile, updatedProfile);

      /**
       * Update Sidebar User
       */
      const currentUser = storage.getUser();

      if (currentUser) {
        storage.setUser({
          ...currentUser,
          fullName: updatedProfile.fullName,
        });
      }

      toast.success("Profile updated successfully");
    },

    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
