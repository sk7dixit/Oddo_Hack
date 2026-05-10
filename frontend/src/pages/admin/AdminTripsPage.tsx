import React, { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import TripsTable from "../../components/admin/TripsTable";
import TripsSearch from "../../components/admin/TripsSearch";
import PageHeader from "../../components/admin/PageHeader";
import DashboardSkeleton from "../../components/admin/DashboardSkeleton";
import ErrorState from "../../components/admin/ErrorState";
import { getAllTrips, deleteTrip } from "../../services/adminService";
import type { AdminTrip } from "../../types/admin";

const AdminTripsPage = () => {
  const [trips, setTrips] = useState<AdminTrip[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getAllTrips();
      setTrips(data || []);
    } catch (err) {
      setError("Failed to load trips");
      toast.error("Could not fetch trip database");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const tripToDelete = trips.find(t => t.id === id);
    try {
      await deleteTrip(id);
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
      toast.success(`Trip "${tripToDelete?.title || ""}" removed`);
    } catch (err) {
      toast.error("Failed to remove trip. Please try again.");
    }
  };

  const filteredTrips = useMemo(() => {
    return (trips || []).filter((trip) =>
      trip.title.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.toLowerCase())
    );
  }, [trips, search]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PageHeader 
            title="Trips" 
            description="Moderate and manage platform trip itineraries" 
          />
          <TripsSearch search={search} setSearch={setSearch} />
        </div>

        {error && <ErrorState message={error} />}

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <TripsTable trips={filteredTrips} onDelete={handleDelete} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTripsPage;
