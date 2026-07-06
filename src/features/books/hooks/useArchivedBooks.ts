import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "./bookKeys";
import { getArchivedBooks } from "../services/book.service";

export const useArchivedBooks = () => {
  return useQuery({
    queryKey: bookKeys.archived,
    queryFn: getArchivedBooks,
  });
};
