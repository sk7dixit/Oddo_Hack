import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Redesigned Auth & App Flow
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import CompleteProfilePage from './pages/CompleteProfilePage';
import HeroDemoPage from './pages/HeroDemoPage';

// Redesigned Architecture
import { AppRoutes } from './routes/AppRoutes';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#070B14] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-sm font-medium tracking-widest uppercase opacity-50">TraveLoop</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HeroDemoPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Profile Setup */}
      <Route path="/complete-profile" element={
        <ProtectedRoute requireProfileCompletion={false}>
          <CompleteProfilePage />
        </ProtectedRoute>
      } />

      {/* Main Authenticated App */}
      <Route path="/*" element={
        <ProtectedRoute>
          <AppRoutes />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
