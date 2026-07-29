import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../services/profile.service";
import { profileKeys } from "./profileKeys";

export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.profile,
    queryFn: getProfile,

    // Always fetch the latest logged-in user's profile
    staleTime: 0,

    // Refetch whenever this hook mounts
    refetchOnMount: "always",

    // Don't refetch just because the browser tab gains focus
    refetchOnWindowFocus: false,
  });
};
