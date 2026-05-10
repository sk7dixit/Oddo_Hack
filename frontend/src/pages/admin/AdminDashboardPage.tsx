import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Users, Map, Wallet, NotebookPen } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import UsersChart from "../../components/admin/UsersChart";
import TripsChart from "../../components/admin/TripsChart";
import TopCitiesChart from "../../components/admin/TopCitiesChart";
import DashboardSkeleton from "../../components/admin/DashboardSkeleton";
import PageHeader from "../../components/admin/PageHeader";
import { getDashboardStats } from "../../services/adminService";
import type { DashboardStats } from "../../types/admin";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error("Failed to sync dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <DashboardSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader 
          title="Dashboard" 
          description="Real-time platform overview and system metrics" 
        />

        {/* STATS GRID */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <StatsCard
            title="Total Users"
            value={(stats?.totalUsers || 0).toLocaleString()}
            icon={Users}
            trend="+12% from last month"
            isPositive={true}
          />

          <StatsCard
            title="Total Trips"
            value={(stats?.totalTrips || 0).toLocaleString()}
            icon={Map}
            trend="+24% from last month"
            isPositive={true}
          />

          <StatsCard
            title="Active Journals"
            value={(stats?.activeJournals || 0).toLocaleString()}
            icon={NotebookPen}
            trend="+8% from last month"
            isPositive={true}
          />

          <StatsCard
            title="Revenue"
            value={`$${(stats?.revenue || 0).toLocaleString()}`}
            icon={Wallet}
            trend="+18% from last month"
            isSpecial={true}
          />
        </motion.div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UsersChart data={stats?.monthlyGrowth || []} />
          <TripsChart data={stats?.tripStats || []} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopCitiesChart data={stats?.topCities || []} />
          
          {/* Revenue Placeholder / Additional Chart */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-[240px] md:h-[280px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-11 h-11 bg-[#F5F7FB] rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#E5E7EB]">
                <Wallet className="text-[#6B7280]" size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#111827] leading-tight">Revenue Analytics</h3>
              <p className="text-[#6B7280] text-sm mt-1">Detailed breakdown coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
