import React from "react";
import { Link } from "react-router-dom";
import FloatingDock from "../ui/FloatingDock";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto h-24 px-8 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group transition-transform active:scale-95">
          <div className="w-12 h-12 rounded-[1.25rem] bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white text-xl shadow-2xl group-hover:bg-blue-600 transition-all duration-500">
            ✈️
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter drop-shadow-sm">Traveloop</h1>
        </Link>

        <div className="hidden lg:block">
          <FloatingDock />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
              🔔
            </button>
            <button className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
              ⚙️
            </button>
          </div>
          
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <div className="text-right hidden sm:block">
               <p className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Status: Active</p>
               <p className="text-xs font-black text-white leading-none">Traveler</p>
            </div>
            <div className="w-11 h-11 rounded-[1.2rem] bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 flex items-center justify-center font-black text-white text-[10px] shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              U
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
