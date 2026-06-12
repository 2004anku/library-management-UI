"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import { getDashboardStats } from "@/domain/features/dashboard/services/dashboard.service";
import { handleApiError } from "@/utils/errorHandler";
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-[32px] font-bold mb-6 tracking-tight text-white">
          Admin<span className="text-indigo-500">Dashboard</span>
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
