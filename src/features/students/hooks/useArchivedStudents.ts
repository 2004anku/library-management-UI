import { useQuery } from "@tanstack/react-query";

import { getArchivedStudents } from "../services/student.service";
import { studentKeys } from "./studentKeys";

export const useArchivedStudents = () => {
  return useQuery({
    queryKey: studentKeys.archived,

    queryFn: getArchivedStudents,
  });
};
