import { queryClient } from "@/lib/tanstack/queryClient";
import { queryKeys } from "@/lib/tanstack/queryKeys";

// Services
import { getAllStudents } from "@/features/students/services/student.service";
import { getAllBooks } from "@/features/books/services/book.service";
import { getAllRequests } from "@/features/requests/services/request.service";
import { getDashboardStats } from "@/features/dashboard/services/dashboard.service";

/**
 * Prefetch Students
 */
export const prefetchStudents = async () => {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.students,
    queryFn: getAllStudents,
  });
};

/**
 * Prefetch Books
 */
export const prefetchBooks = async () => {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.books,
    queryFn: getAllBooks,
  });
};

/**
 * Prefetch Requests
 */
export const prefetchRequests = async () => {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.requests,
    queryFn: getAllRequests,
  });
};

/**
 * Prefetch Dashboard
 */
export const prefetchDashboard = async () => {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dashboard,
    queryFn: getDashboardStats,
  });
};
