import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Activity, Zap } from 'lucide-react';
import { financeIntelligence } from '@/data/finance';

export const HorizontalSpendingTimeline = () => {
  return (
    <div className="space-y-10 mb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">Spending Flow</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic">Daily Financial <span className="text-slate-500 not-italic">Timeline</span></h2>
        </div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest max-w-xs text-right">
          Visualizing the metabolic rhythm of your trip's financial footprint.
        </p>
      </div>

      <div className="relative pt-20 pb-10">
        {/* Continuous Timeline Line */}
        <div className="absolute top-[88px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="flex overflow-x-auto no-scrollbar gap-12 px-10 pb-10 items-start">
          {financeIntelligence.timeline.map((day, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative shrink-0 w-[280px] group"
            >
              {/* Timeline Point */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-[#050816] border-2 border-white/20 group-hover:border-cyan-400 transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">D0{day.day}</span>
              </div>

              {/* Data Card */}
              <div className="mt-16 p-8 rounded-[32px] bg-white/5 border border-white/5 group-hover:border-white/10 group-hover:bg-white/[0.07] transition-all duration-500 space-y-6 shadow-xl">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="h-3 w-3" /> {day.city}
                    </div>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                      day.amount > 12000 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {day.mood}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">₹{day.amount.toLocaleString()}</h4>
                </div>

                <div className="p-4 rounded-2xl bg-black/20 text-slate-400 text-xs font-medium leading-relaxed">
                  {day.highlight}
                </div>

                <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                  <Zap className="h-3 w-3" /> {day.type} Focus
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
