"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip protection for login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      setIsAuthorized(true);
      return;
    }

    const checkAuth = () => {
      const token = localStorage.getItem("admin_token");
      
      if (!token) {
        router.push("/admin/login");
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
