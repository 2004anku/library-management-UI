import { useQuery } from "@tanstack/react-query";

import { getAllRequests } from "../services/request.service";
import { requestKeys } from "./requestKeys";

export const useRequests = () => {
  return useQuery({
    queryKey: requestKeys.all,

    queryFn: getAllRequests,
  });
};
