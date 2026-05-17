import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/context/AuthContext';

// Import Productized Modules
import TravelHub from '@/pages/modules/TravelHub';
import JourneyFlow from '@/pages/modules/JourneyFlow';
import VoyageAI from '@/pages/modules/VoyageAI';
import FinanceHub from '@/pages/modules/FinanceHub';
import PackingCenter from '@/pages/modules/PackingCenter';
import Journal from '@/pages/modules/Journal';
import SharedJourney from '@/pages/modules/SharedJourney';
import Discover from '@/pages/modules/Discover';
import CreateTrip from '@/pages/modules/CreateTrip';
import DestinationDetail from '@/pages/modules/DestinationDetail';

// Additional Shared Flows
import ItineraryBuilder from '@/pages/itinerary/ItineraryBuilder';
import Profile from '@/pages/profile/Profile';

// Auth Pages (Placeholder)
const Login = () => {
  const { setUser, setToken } = useAuthStore();
  
  const handleDemoLogin = () => {
    // Re-initialize with the default user for the hackathon demo
    window.location.reload(); // Hard reload to reset state if needed, or just navigate
  };

  return (
    <div className="h-screen w-full bg-[#050816] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-blue-600/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-6">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/20 animate-pulse">
          <Zap className="h-10 w-10 text-white" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-white italic uppercase">Session Terminated</h1>
          <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            Your secure travel intelligence session has ended. Redirecting to core authentication protocols.
          </p>
        </div>

        <button 
          onClick={() => window.location.href = '/travel-hub'}
          className="px-12 py-5 rounded-[24px] bg-white text-slate-900 font-black text-sm uppercase tracking-[0.3em] hover:bg-cyan-400 hover:text-white transition-all shadow-6xl group"
        >
          Restore Intelligence Sync
        </button>
      </div>
    </div>
  );
};

export const AppRoutes = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout Routes */}
      <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route path="/travel-hub" element={<TravelHub />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/journey-flow" element={<JourneyFlow />} />
        <Route path="/voyage-ai" element={<VoyageAI />} />
        <Route path="/finance-hub" element={<FinanceHub />} />
        <Route path="/packing-center" element={<PackingCenter />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/shared-journey" element={<SharedJourney />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:country/:cityId" element={<DestinationDetail />} />
        
        {/* Helper Routes */}
        <Route path="/itinerary-builder/:tripId" element={<ItineraryBuilder />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Default Redirects */}
        <Route path="/dashboard" element={<Navigate to="/travel-hub" replace />} />
        <Route path="/" element={<Navigate to="/travel-hub" replace />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/travel-hub" : "/login"} replace />} />
    </Routes>
  );
};

