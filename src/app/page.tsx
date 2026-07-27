"use client";

import ProtectedRoute from "@/components/auth/protectedRoutes";
import Sidebar from "@/components/sidebar/Sidebar";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";

import DashboardHeader from "@/components/dashboard/dashboardHeader";
import DashboardStats from "@/components/dashboard/dashboardState";

function DashboardContent() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return <LoadingState message="" />;
  }

  if (error) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "Failed to load dashboard."
        }
      />
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <DashboardHeader />

        <DashboardStats
          stats={{
            totalStudents: stats?.totalStudents ?? 0,
            totalBooks: stats?.totalBooks ?? 0,
            booksAvailable: stats?.booksAvailable ?? 0,
            booksIssued: stats?.booksIssued ?? 0,
            pendingRequests: stats?.pendingRequests ?? 0,
            returnRequests: stats?.returnRequests ?? 0,
            totalFinePending: stats?.totalFinePending ?? 0,
          }}
        />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
