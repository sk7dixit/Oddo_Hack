import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Wallet, ChevronDown, ChevronUp, Plus, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ActivityCard = ({ activity }: { activity: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="group relative flex gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
    >
      <div className="w-20 shrink-0 text-center space-y-1">
        <span className="text-xs font-bold text-cyan-400 tabular-nums">{activity.time}</span>
        <div className="h-full w-px bg-white/10 mx-auto" />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">{activity.title}</h4>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <MapPin className="h-3 w-3" />
              {activity.location}
            </p>
          </div>
          <button className="text-slate-600 hover:text-white transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">
            <Wallet className="h-3 w-3 text-emerald-400" />
            {activity.cost}
          </div>
          {activity.tags.map((tag: string) => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {tag}
            </span>
          ))}
        </div>
        
        {activity.notes && (
          <p className="text-[10px] text-slate-400 italic">“{activity.notes}”</p>
        )}
      </div>
    </motion.div>
  );
};

export const DayCard = ({ day }: { day: any }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative pl-12 mb-10">
      {/* Timeline Line */}
      <div className="absolute left-4 top-0 bottom-[-40px] w-px bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-0 h-9 w-9 rounded-full border border-white/10 bg-[#070B14] flex items-center justify-center z-10 shadow-xl">
        <span className="text-[10px] font-bold text-blue-400">D{day.dayNumber}</span>
      </div>

      <div className={cn(
        "premium-card !p-0 overflow-hidden",
        isExpanded ? "border-white/20 shadow-2xl shadow-blue-900/10" : "border-white/5"
      )}>
        <div 
          className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-white">Day {day.dayNumber}</h3>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest border-l border-white/10 pl-4">
              {day.date}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{day.activities.length} activities</span>
            <button className="text-slate-400 hover:text-white">
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-6 space-y-4"
            >
              {day.activities.length > 0 ? (
                day.activities.map((act: any) => (
                  <ActivityCard key={act.id} activity={act} />
                ))
              ) : (
                <div className="py-10 text-center space-y-3 rounded-2xl bg-white/5 border border-dashed border-white/10">
                  <p className="text-sm text-slate-500">No activities yet. Start building your perfect day ✨</p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all">
                    <Plus className="h-3 w-3" /> Add Activity
                  </button>
                </div>
              )}
              
              <button className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-xs font-bold text-slate-500 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" /> Add Next Activity
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
