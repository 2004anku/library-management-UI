"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import { getDashboardStats } from "@/features/dashboard/services/dashboard.service";
import { handleApiError } from "@/utils/errorHandler";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";

type Stats = {
  totalStudents: number;
  totalBooks: number;
  booksIssued: number;
  pendingRequests: number;
  returnRequests: number;
  totalFinePending: number;
};

function DashboardContent() {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalBooks: 0,
    booksIssued: 0,
    pendingRequests: 0,
    returnRequests: 0,
    totalFinePending: 0,
  });
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const data = await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.error(error);
        setError(handleApiError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  if (loading) {
    return <LoadingState message="" />;
  }
  if (error) {
    return <ErrorState message={error} />;
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
          <StatsCard title="Total Students" count={stats.totalStudents} />

          <StatsCard title="Total Books" count={stats.totalBooks} />

          <StatsCard title="Books Issued" count={stats.booksIssued} />

          <StatsCard title="Pending Requests" count={stats.pendingRequests} />

          <StatsCard title="Return Requests" count={stats.returnRequests} />

          <StatsCard title="Fine Pending" count={stats.totalFinePending} />
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
