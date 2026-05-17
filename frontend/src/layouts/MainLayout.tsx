import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TopHeader } from '@/components/navigation/TopHeader';
import { AnimatedNavbar } from '@/components/ui/AnimatedNavbar';
import { GradientBackground, FloatingParticles } from '@/components/ui/GradientBackground';
import { PageTransition } from '@/components/ui/PremiumUI';
import { PageWrapper } from '@/components/layout/PageWrapper';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full bg-[#050816] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* 1. Global Cinematic Environment */}
      <GradientBackground />
      <FloatingParticles />

      {/* 2. Top Navigation Header */}
      <TopHeader />

      {/* 3. Main Page Content */}
      <main className="relative z-10 w-full pb-32">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* 4. Global Floating Navbar (Dock) */}
      <AnimatedNavbar />

      {/* 5. Custom Scrollbar Styling */}
      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 209, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
