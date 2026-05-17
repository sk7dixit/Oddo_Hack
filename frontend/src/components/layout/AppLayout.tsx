import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AnimatedNavbar } from "@/components/ui/AnimatedNavbar";
import { GradientBackground, FloatingParticles } from "@/components/ui/GradientBackground";
import { PageTransition } from "@/components/ui/PremiumUI";

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full bg-[#050816] text-white selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-y-auto overflow-x-hidden">
      {/* 1. Global Cinematic Environment - Optimized */}
      <GradientBackground />
      <FloatingParticles />

      {/* 2. Main Content Area - Single Scroll Container */}
      <main className="relative z-10 w-full min-h-screen pt-10 pb-32">
        <div className="section-container">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>

      {/* 3. Floating Navigation System */}
      <AnimatedNavbar />
    </div>
  );
};

export default AppLayout;
