"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import { getDashboardStats } from "@/domain/features/dashboard/services/dashboard.service";
import { handleApiError } from "@/utils/errorHandler";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";

type Stats = {
  totalStudents: number;
  totalBooks: number;
  totalRequests: number;
};

function DashboardContent() {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalBooks: 0,
    totalRequests: 0,
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

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="heading-fonttext-[32px] font-bold mb-6 tracking-tight text-white">
          Admin<span className="heading-font text-indigo-500">Dashboard</span>
        </h1>

        <div className="grid grid-cols-3 gap-4">
          <StatsCard title="Total Students" count={stats.totalStudents} />

          <StatsCard title="Total Books" count={stats.totalBooks} />

          <StatsCard title="Total Requests" count={stats.totalRequests} />
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
