import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* SaaS Top Navigation */}
      <Navbar />

      {/* Main Responsive Content Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <Outlet />
      </main>
      
      {/* Minimal Footer */}
      <footer className="py-10 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 grayscale opacity-30">
            <div className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center text-white text-xs">✈️</div>
            <span className="text-sm font-black tracking-tighter text-slate-800 uppercase">Traveloop</span>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© 2026 Traveloop AI • Hackathon Edition</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
