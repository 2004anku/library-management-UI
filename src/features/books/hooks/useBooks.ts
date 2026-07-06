"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "../services/book.service";
import { bookKeys } from "./bookKeys";
export function useBooks() {
  return useQuery({
    queryKey: bookKeys.all,
    queryFn: getAllBooks,
  });
}
