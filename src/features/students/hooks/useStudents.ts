import { useQuery } from "@tanstack/react-query";

import { getAllStudents } from "../services/student.service";
import { studentKeys } from "./studentKeys";

export const useStudents = () => {
  return useQuery({
    queryKey: studentKeys.all,

    queryFn: getAllStudents,
  });
};
