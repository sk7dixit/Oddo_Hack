"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar/Sidebar";
import { Navbar } from "@/components/admin/navbar/Navbar";
import { AdminAuthGuard } from "@/components/admin/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-background flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col md:pl-64">
          <Navbar />
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
