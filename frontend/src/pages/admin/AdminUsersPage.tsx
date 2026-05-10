import React, { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/admin/AdminLayout";
import UsersTable from "../../components/admin/UsersTable";
import UsersSearch from "../../components/admin/UsersSearch";
import PageHeader from "../../components/admin/PageHeader";
import DashboardSkeleton from "../../components/admin/DashboardSkeleton";
import ErrorState from "../../components/admin/ErrorState";
import { getAllUsers, deleteUser } from "../../services/adminService";
import type { AdminUser } from "../../types/admin";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (err) {
      setError("Failed to load users");
      toast.error("Could not fetch user directory");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const userToDelete = users.find(u => u.id === id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success(`User ${userToDelete?.name || ""} deleted successfully`);
    } catch (err) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const filteredUsers = useMemo(() => {
    return (users || []).filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PageHeader 
            title="Users" 
            description="Manage platform users and permissions" 
          />
          <UsersSearch search={search} setSearch={setSearch} />
        </div>

        {error && <ErrorState message={error} />}

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <UsersTable users={filteredUsers} onDelete={handleDelete} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
