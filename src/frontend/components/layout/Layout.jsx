import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Immersive Top Navigation */}
      <Navbar />

      {/* Main Content Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-20">
        <Outlet />
      </main>
      
      {/* Minimalistic Glass Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 grayscale opacity-20">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-white text-sm">✈️</div>
            <span className="text-lg font-black tracking-tighter text-white uppercase">Traveloop</span>
          </div>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">© 2026 Traveloop AI • Digital Companion</p>
        </div>
      </footer>
    </div>
  );
}
