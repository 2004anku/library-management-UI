import {
  FaBook,
  FaClipboardList,
  FaMoneyBillWave,
  FaUserGraduate,
} from "react-icons/fa";

import { FaBookOpen } from "react-icons/fa6";

import StatsCard from "@/components/dashboard/StatsCard";
import { DashboardStats as DashboardStatsType } from "../../features/dashboard/types/dashboardTypes";

type Props = {
  stats: DashboardStatsType;
};

export default function DashboardStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <StatsCard
        title="Total Students"
        value={stats.totalStudents}
        icon={<FaUserGraduate />}
        description="Registered students"
      />

      <StatsCard
        title="Total Books"
        value={stats.totalBooks}
        icon={<FaBook />}
        description="Books in library"
      />

      <StatsCard
        title="Books Issued"
        value={stats.booksIssued}
        icon={<FaBookOpen />}
        description="Currently issued"
      />

      <StatsCard
        title="Pending Requests"
        value={stats.pendingRequests}
        icon={<FaClipboardList />}
        description="Waiting approval"
      />

      <StatsCard
        title="Return Requests"
        value={stats.returnRequests}
        icon={<FaClipboardList />}
        description="Awaiting return"
      />

      <StatsCard
        title="Fine Pending"
        value={stats.totalFinePending}
        icon={<FaMoneyBillWave />}
        description="Outstanding fines"
      />
    </div>
  );
}
