import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminTripsPage from "../pages/admin/AdminTripsPage";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<AdminLoginPage />}
      />

      <Route
        path="/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <AdminProtectedRoute>
            <AdminUsersPage />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/trips"
        element={
          <AdminProtectedRoute>
            <AdminTripsPage />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <AdminProtectedRoute>
            <AdminAnalyticsPage />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <AdminProtectedRoute>
            <AdminSettingsPage />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
