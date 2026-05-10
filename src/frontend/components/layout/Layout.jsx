import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fc] relative overflow-hidden flex flex-col">
      {/* Soft Aurora Glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(99,102,241,0.18), transparent 28%),
            radial-gradient(circle at top right, rgba(236,72,153,0.12), transparent 30%),
            radial-gradient(circle at bottom left, rgba(59,130,246,0.12), transparent 30%),
            linear-gradient(to bottom, #f8fafc, #eef2ff)
          `
        }}
      />

      <Navbar />
      
      <main className="relative z-10 flex-grow pt-8">
        <Outlet />
      </main>

      <footer className="relative z-10 py-12 px-8 border-t border-slate-200/60 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">© 2026 Traveloop Companion</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest">Security</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest">Support</a>
          </div>
        </div>
      </footer>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'glass-card text-slate-900 font-medium text-sm rounded-2xl border-none',
        }}
      />
    </div>
  );
};

export default Layout;
