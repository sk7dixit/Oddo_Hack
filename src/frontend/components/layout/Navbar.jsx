import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Settings, Compass, Globe } from "lucide-react";
import FloatingDock from "../ui/FloatingDock";

export default function Navbar({ isPublic = false }) {
  const location = useLocation();

  return (
    <div className="sticky top-0 left-0 w-full z-50">
      <header className="w-full h-20 border-b border-slate-200/60 backdrop-blur-xl bg-white/60">
        <div className="max-w-7xl mx-auto h-full px-10 flex items-center justify-between">
          
          {/* Editorial Logo */}
          <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform shrink-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
              <Compass size={20} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Traveloop</h1>
          </Link>

          {/* Minimal Tab Navigation */}
          <div className="hidden lg:block">
            <FloatingDock isPublic={isPublic} />
          </div>

          {/* Utility Suite */}
          <div className="flex items-center gap-6 shrink-0">
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

      {/* Public Journey Status Strip (Only on Share Page) */}
      {isPublic && (
        <div className="h-10 bg-white/60 backdrop-blur-md border-b border-zinc-200 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-10 flex items-center gap-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-blue-500" />
              <span>Shared Publicly by Shashwat</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span className="text-zinc-200">|</span>
              <span>Updated 2h ago</span>
              <span className="text-zinc-200">•</span>
              <span>248 photos</span>
              <span className="text-zinc-200">•</span>
              <span>2 Memories</span>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Navigation Dock (Bottom Sticky) */}
      <div className="lg:hidden fixed bottom-6 left-0 w-full px-6 flex justify-center pointer-events-none z-[100]">
        <div className="pointer-events-auto scale-90 sm:scale-100">
           <FloatingDock isPublic={isPublic} />
        </div>
      </div>
    </div>
  );
}
