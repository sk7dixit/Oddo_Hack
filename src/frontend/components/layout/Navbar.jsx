import React from "react";
import { Link } from "react-router-dom";
import { Bell, Settings, Compass } from "lucide-react";
import FloatingDock from "../ui/FloatingDock";

export default function Navbar() {
  return (
    <header className="sticky top-0 left-0 w-full z-50 h-20 border-b border-slate-200/60 backdrop-blur-xl bg-white/60">
      <div className="max-w-7xl mx-auto h-full px-10 flex items-center justify-between">
        
        {/* Editorial Logo */}
        <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
            <Compass size={20} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Traveloop</h1>
        </Link>

        {/* Minimal Tab Navigation */}
        <div className="hidden lg:block">
          <FloatingDock />
        </div>

        {/* Utility Suite */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
              <Bell size={18} />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
              <Settings size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200/60">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Explorer</p>
               <p className="text-xs font-semibold text-slate-900">Traveler</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-900 text-xs cursor-pointer hover:bg-white transition-colors">
              U
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
