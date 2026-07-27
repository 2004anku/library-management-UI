import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../services/profile.service";
import { profileKeys } from "./profileKeys";

export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.profile,
    queryFn: getProfile,
  });
};
