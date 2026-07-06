"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";

function DashboardContent() {
  const { data: stats, isLoading: loading, error } = useDashboardStats();
  if (loading) {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[32px] font-bold tracking-tight text-white">
            Admin
            <span className="text-indigo-500">Dashboard</span>
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatsCard title="Total Students" count={stats?.totalStudents ?? 0} />

          <StatsCard title="Total Books" count={stats?.totalBooks ?? 0} />

          <StatsCard title="Books Issued" count={stats?.booksIssued ?? 0} />

          <StatsCard
            title="Pending Requests"
            count={stats?.pendingRequests ?? 0}
          />

          <StatsCard
            title="Return Requests"
            count={stats?.returnRequests ?? 0}
          />

          <StatsCard
            title="Fine Pending"
            count={stats?.totalFinePending ?? 0}
          />
        </div>
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
