import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-100 w-full overflow-hidden">
      {/* Sidebar - Fixed width, hidden on small mobile if needed, but here we keep it for desktop focus */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar - Fixed height header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0">
          <Navbar />
        </header>

        {/* Dynamic Page Stage */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
