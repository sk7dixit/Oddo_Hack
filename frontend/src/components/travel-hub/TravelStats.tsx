import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Wallet, CloudRain, Sparkles, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { useTravelStore, type TravelInsight } from '@/store/useTravelStore';
import { cn } from '@/lib/utils';

const InsightIcon = ({ category }: { category: TravelInsight['category'] }) => {
  switch (category) {
    case 'logistics': return <Plane size={20} className="text-blue-400" />;
    case 'budget': return <Wallet size={20} className="text-emerald-400" />;
    case 'weather': return <CloudRain size={20} className="text-amber-400" />;
    case 'ai': return <Sparkles size={20} className="text-cyan-400" />;
  }
};

export const TravelStats = () => {
  const { insights } = useTravelStore();

  // We want 1 Large (primary) + 2 Small widgets
  const primaryInsight = insights[0];
  const secondaryInsights = insights.slice(1, 3);

  return (
    <section className="space-y-8 h-full">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-white tracking-tight px-2">Travel Intelligence</h2>
        <p className="text-slate-500 text-sm font-medium px-2">Live insights and automated travel logic.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 h-full">
        {/* 1. Primary Insight (Large) */}
        {primaryInsight && (
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden p-8 rounded-[32px] bg-gradient-to-br from-[#0F1428]/80 to-[#070B14]/40 border border-white/8 backdrop-blur-xl shadow-2xl transition-all hover:border-blue-500/20"
          >
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <InsightIcon category={primaryInsight.category} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  Active logistics
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{primaryInsight.label}</p>
                <h3 className="text-4xl font-bold text-white tracking-tight">{primaryInsight.value}</h3>
                <p className="text-slate-400 text-sm font-medium">{primaryInsight.subValue}</p>
              </div>

              <button className="flex items-center gap-2 text-blue-400 text-sm font-bold group/btn mt-4">
                Manage Details
                <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>

            {/* Subtle background graphic */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-1/4 -translate-y-1/4">
              <Plane size={240} />
            </div>
          </motion.div>
        )}

        {/* 2. Secondary Grid (2 small) */}
        <div className="grid grid-cols-2 gap-6">
          {secondaryInsights.map((insight, idx) => (
            <motion.div
              key={insight.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-[#0F1428]/72 border border-white/8 backdrop-blur-xl shadow-2xl transition-all hover:border-white/20"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                    insight.type === 'warning' ? "bg-amber-400/10 border border-amber-400/20" : "bg-white/5 border border-white/10"
                  )}>
                    <InsightIcon category={insight.category} />
                  </div>
                  {insight.trend === 'stable' && <TrendingUp size={14} className="text-emerald-400/60" />}
                  {insight.type === 'warning' && <AlertCircle size={14} className="text-amber-400" />}
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{insight.label}</p>
                  <h4 className="text-lg font-bold text-white tracking-tight">{insight.value}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{insight.subValue}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
