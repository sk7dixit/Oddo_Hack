import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import UsersChart from "../../components/admin/UsersChart";
import TopCitiesChart from "../../components/admin/TopCitiesChart";
import ActivityAnalyticsChart from "../../components/admin/ActivityAnalyticsChart";
import PageHeader from "../../components/admin/PageHeader";
import DashboardSkeleton from "../../components/admin/DashboardSkeleton";
import ErrorState from "../../components/admin/ErrorState";
import { getAnalyticsData } from "../../services/adminService";
import type { AnalyticsData } from "../../types/admin";

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalyticsData();
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics");
      toast.error("Could not synchronize analytics engine");
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
          title="Analytics" 
          description="In-depth platform performance and user engagement metrics" 
        />

        {error && <ErrorState message={error} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsCard
            title="Total Revenue"
            value={`$${(analytics?.totalRevenue || 0).toLocaleString()}`}
          />
          <AnalyticsCard
            title="Avg Trip Budget"
            value={`$${(analytics?.avgTripBudget || 0).toLocaleString()}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UsersChart data={analytics?.monthlyUsers || []} />
          <TopCitiesChart data={analytics?.topDestinations || []} />
        </div>

        <ActivityAnalyticsChart data={analytics?.activityData || []} />
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
