import React from 'react';
import { motion } from 'framer-motion';
import { CompactBudgetHero } from '@/components/budget/CompactBudgetHero';
import { CategoryDistribution } from '@/components/budget/CategoryDistribution';
import { HorizontalSpendingTimeline } from '@/components/budget/HorizontalSpendingTimeline';
import { AIIntelligenceRail, FinancialHealth } from '@/components/budget/FinancialSystems';
import { Wallet, Sparkles, RefreshCw, ArrowUpRight } from 'lucide-react';

const FinanceHub = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white pt-32 selection:bg-cyan-500/30">
      <div className="max-w-[1440px] mx-auto space-y-48 pb-60 px-6">
        
        {/* 1. COMPACT HERO SECTION - Reduced Height, Increased Intel */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Wallet className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">Financial Intelligence Hub</span>
              </div>
              <h1 className="title-section">Smart Travel <span className="italic">Budget</span></h1>
            </div>
            <p className="body-premium max-w-md text-right md:text-left">
              An autonomous financial intelligence layer tracking every expense with predictive precision.
            </p>
          </div>
          <CompactBudgetHero />
        </section>

        {/* 2. CATEGORY ALLOCATION - Cinematic Split Layout */}
        <section className="space-y-20">
          <CategoryDistribution />
        </section>

        {/* 3. SPENDING TIMELINE - Horizontal Discovery */}
        <section>
          <HorizontalSpendingTimeline />
        </section>

        {/* 4. AI INTELLIGENCE RAIL - Floating Insights */}
        <section>
          <AIIntelligenceRail />
        </section>

        {/* 5. FINANCIAL HEALTH - Premium Analysis */}
        <section className="space-y-12">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Financial <span className="not-italic text-slate-500">Integrity</span></h2>
            <p className="text-slate-400 text-lg font-medium">Measuring the alignment between your spending patterns and your travel goals.</p>
          </div>
          <FinancialHealth />
        </section>

        {/* 6. SMART AI OPTIMIZATION PANEL - Premium Gateway */}
        <section className="pt-20">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-20 rounded-[64px] bg-gradient-to-br from-emerald-600/10 via-cyan-600/5 to-blue-600/10 border border-white/5 text-center space-y-10 relative overflow-hidden group shadow-4xl"
          >
            <div className="relative z-10 space-y-6">
              <div className="h-16 w-16 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mx-auto group-hover:scale-110 transition-transform duration-700">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Optimize Your <span className="not-italic">Capital</span></h2>
              <p className="body-premium max-w-2xl mx-auto">
                Voyage AI can potentially rebalance your itinerary to save ₹12,000 without compromising your travel experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-14 py-6 rounded-[28px] bg-white text-slate-900 font-black text-[12px] uppercase tracking-[0.4em] hover:bg-slate-200 transition-all shadow-5xl cursor-pointer">
                  Apply AI Optimization
                </button>
                <button className="px-14 py-6 rounded-[28px] bg-white/5 border border-white/10 text-white font-black text-[12px] uppercase tracking-[0.4em] hover:bg-white/10 transition-all cursor-pointer">
                  View Detailed Audit
                </button>
              </div>
            </div>
            
            {/* Ambient light effects */}
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-1000" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-1000" />
          </motion.div>
        </section>

      </div>

      {/* Ambient background lighting system */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/5 blur-[180px] rounded-full" />
      </div>
    </div>
  );
};

export default FinanceHub;
