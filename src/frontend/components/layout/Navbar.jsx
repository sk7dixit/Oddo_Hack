import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Packing Checklist";
      case "/notes": return "Travel Journal";
      default: return "Dashboard";
    }
  };

  return (
    <nav className="h-24 flex items-center justify-between px-10 bg-white/80 backdrop-blur-md border-b border-slate-50 sticky top-0 z-40">
      <div className="flex flex-col">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">{getPageTitle()}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Sync Enabled</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex -space-x-3">
          {[1, 2].map(i => (
            <div key={i} className="w-10 h-10 rounded-2xl border-4 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 overflow-hidden">
              <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-2xl border-4 border-white bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">+</div>
        </div>
        <div className="h-10 w-[1px] bg-slate-100"></div>
        <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl hover:bg-slate-100 transition-colors">
          ⚙️
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
