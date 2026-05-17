import React from 'react';
import { motion } from 'framer-motion';
import { Map, Zap, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/travel-hub/HeroSection';
import { QuickActions } from '@/components/travel-hub/QuickActions';
import { JourneyStack } from '@/components/ui/JourneyStack';
import { TravelStats } from '@/components/travel-hub/TravelStats';
import { TimelineSection } from '@/components/travel-hub/TimelineSection';
import { DestinationGrid } from '@/components/travel-hub/DestinationGrid';
import { BudgetSnapshot } from '@/components/travel-hub/BudgetSnapshot';
import { JournalPreview } from '@/components/travel-hub/JournalPreview';

// Mock Data
import { 
  mockJourneys, 
  mockDestinations, 
  mockNotes, 
  mockBudget 
} from '@/data/mockTravelData';

const TravelHub = () => {
  // Mapping mock data to match CardStackItem interface
  const journeyItems = mockJourneys.map(journey => ({
    ...journey,
    imageSrc: journey.image
  }));

  return (
    <div className="relative space-y-24 pb-40">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[0%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-cyan-400/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 grid-layout !gap-24">
        {/* Phase 1: Immersion (Hero) */}
        <HeroSection />

        {/* Phase 2: Action Center (Launcher) */}
        <div className="space-y-8 px-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-blue-500 rounded-full" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Mission Control</span>
          </div>
          <QuickActions />
        </div>

        {/* Phase 3: Active Journeys (Cinematic Depth) */}
        <section className="space-y-12">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <Map className="h-7 w-7 text-blue-500" />
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Active Journeys</h2>
            <p className="text-slate-500 text-sm font-medium max-w-lg">Interactive storytelling through your current adventures.</p>
          </div>
          
          <JourneyStack items={journeyItems} />
        </section>

        {/* Phase 4: Journey Activity Center (Live Feed + Intelligence) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Stats & Intelligence Widgets */}
          <div className="lg:col-span-5">
            <TravelStats />
          </div>
          
          {/* Smart Timeline Carousel */}
          <div className="lg:col-span-7">
            <TimelineSection />
          </div>
        </div>

        {/* Phase 5: Discovery & Inspiration */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Sparkles className="text-cyan-400" size={24} />
              <h2 className="text-3xl font-bold text-white tracking-tight">Discover Your Next World</h2>
            </div>
            <button className="text-xs font-bold text-cyan-400 hover:text-white transition-colors uppercase tracking-widest">
              Explore All
            </button>
          </div>
          <DestinationGrid destinations={mockDestinations} />
        </section>

        {/* Phase 6: Management Layers (Budget & Journal) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <BudgetSnapshot budget={mockBudget} />
          <JournalPreview notes={mockNotes} />
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="relative z-10 pt-20 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-white/20">
            <Zap size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Quantum Travel Architecture</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-800">
            TraveLoop — Engineering the Future of Travel
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TravelHub;
