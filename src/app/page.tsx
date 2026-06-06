import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          <StatsCard title="Total Students" count={120} />

          <StatsCard title="Total Books" count={1500} />

          <StatsCard title="Total Requests" count={18} />
        </div>
      </main>
    </div>
  );
}
