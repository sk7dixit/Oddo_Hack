import React, { useState } from "react";
import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import PageTransition from "./PageTransition";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex relative font-sans antialiased overflow-hidden">
      {/* Sidebar - Handles its own responsive visibility */}
      <AdminSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Backdrop for mobile sidebar */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[72px] transition-all duration-300 relative z-10 w-full min-w-0 min-h-screen overflow-y-auto">
        <AdminNavbar onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 md:px-6 py-4 md:py-6">
          <div className="max-w-[1400px] mx-auto">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
