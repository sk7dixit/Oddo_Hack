import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import DashboardPage from './pages/ui/DashboardPage';
import MyTripsPage from './pages/trips/MyTripsPage';
import CreateTripPage from './pages/trips/CreateTripPage';
import TripDetailsPage from './pages/trips/TripDetailsPage';
import ProfilePage from './pages/auth/ProfilePage';

// UI Feature Pages
import PackingChecklistPage from './pages/ui/PackingChecklistPage';
import NotesPage from './pages/ui/NotesPage';
import PublicTripPage from './pages/ui/PublicTripPage';

// Budget Feature Pages
import BudgetPage from './pages/budget/BudgetPage';
import ActivitySearchPage from './pages/budget/ActivitySearchPage';
import BudgetDashboardPage from './pages/budget/BudgetDashboardPage';

// Admin Routes
import AdminRoutes from './routes/AdminRoutes';

// Components
import Navbar from './components/ui/Navbar';
import Sidebar from './components/ui/Sidebar';
import { useUser } from './hooks/useUser';

const App = () => {
  const { user } = useUser();

  return (
    <div className="app">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main className="main-content" style={{ flex: 1, padding: '40px' }}>
          <Routes>
            {/* Core App Routes */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/trips/create" element={<CreateTripPage />} />
            <Route path="/trips/:id" element={<TripDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Checklist & Notes (from UI feature) */}
            <Route path="/checklist" element={<PackingChecklistPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/public/:id" element={<PublicTripPage />} />

            {/* Budget Routes */}
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/budget/activities" element={<ActivitySearchPage />} />
            <Route path="/budget/dashboard" element={<BudgetDashboardPage />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
