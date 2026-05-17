import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Camera, Coffee, MoveRight, Cloud } from 'lucide-react';

interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  type: string;
}

interface TimelineProps {
  itinerary: DayPlan[];
}

const typeIcons: any = {
  urban: MapPin,
  culture: Coffee,
  nature: Cloud,
  history: Clock,
  heritage: Camera
};

export const ItineraryTimeline = ({ itinerary }: TimelineProps) => {
  return (
    <div className="space-y-12 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Your Visual Timeline</h3>
          <p className="text-slate-500 text-sm font-medium italic">Optimized for your travel pace and interests</p>
        </div>
      </div>

      <div className="relative space-y-12">
        {/* The Vertical Line */}
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent hidden md:block" />

        {itinerary.map((day, i) => {
          const Icon = typeIcons[day.type] || MapPin;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col md:flex-row gap-8 items-start group"
            >
              {/* Day Badge */}
              <div className="relative z-10 shrink-0 h-12 w-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-white font-black text-xs group-hover:border-cyan-400/50 group-hover:text-cyan-400 transition-all duration-500">
                D0{day.day}
              </div>

              {/* Day Content */}
              <div className="flex-grow p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-500 space-y-6 group shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{day.type} Strategy</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {day.title}
                    </h4>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    Best for {day.day === 1 ? 'Early Start' : 'Mid-Day exploration'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.activities.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-black/20 text-slate-300 text-sm font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {act}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  <MoveRight className="h-3 w-3" /> 
                  Stay Recommendation: Nearby {day.title.split(':')[0]}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
