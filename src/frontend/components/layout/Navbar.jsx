import React from "react";
import { Link } from "react-router-dom";
import FloatingDock from "../ui/FloatingDock";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 h-20 border-b border-white/5 backdrop-blur-xl bg-white/[0.02]">
      <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
        
        {/* Minimalist Logo */}
        <Link to="/" className="flex items-center gap-3 group transition-all active:scale-95">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white text-base shadow-2xl group-hover:bg-blue-600 transition-all duration-300">
            ✈️
          </div>
          <h1 className="text-lg font-black text-white tracking-tighter">Traveloop</h1>
        </Link>

        {/* Professional Navigation Dock */}
        <div className="hidden lg:block">
          <FloatingDock />
        </div>

        {/* Utility Cluster */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 pr-4 border-r border-white/5">
            <button className="w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all">
              🔔
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all">
              ⚙️
            </button>
          </div>
          
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none mb-1">Explorer</p>
               <p className="text-[11px] font-black text-white leading-none">Traveler</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/10 flex items-center justify-center font-black text-white text-[9px] shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              U
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
