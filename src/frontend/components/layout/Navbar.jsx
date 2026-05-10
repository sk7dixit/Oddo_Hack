import React from "react";
import GradientNav from "../ui/GradientNav";

const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-24 px-6 flex items-center justify-between">
        
        {/* Left Section: Branding */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-100">
              ✈️
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter">Traveloop</h1>
          </div>

          {/* Animated Navigation Pills */}
          <div className="hidden lg:block">
            <GradientNav />
          </div>
        </div>

        {/* Right Section: Actions & Account */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-100">
            <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all border border-slate-100">
              🔔
            </button>
            <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all border border-slate-100">
              ⚙️
            </button>
          </div>
          
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Explorer</p>
               <p className="text-sm font-black text-slate-800 leading-none">Traveloop User</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-100">
              U
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
