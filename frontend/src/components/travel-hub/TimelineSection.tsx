import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Bed, Camera, ChevronRight, MapPin, Clock, MoreHorizontal } from 'lucide-react';
import { useTravelStore, type JourneyEvent } from '@/store/useTravelStore';
import { cn } from '@/lib/utils';

const EventIcon = ({ type }: { type: JourneyEvent['type'] }) => {
  switch (type) {
    case 'flight': return <Plane size={20} className="text-blue-400" />;
    case 'hotel': return <Bed size={20} className="text-emerald-400" />;
    case 'activity': return <Camera size={20} className="text-cyan-400" />;
    default: return <MoreHorizontal size={20} className="text-slate-400" />;
  }
};

export const TimelineSection = () => {
  const { events } = useTravelStore();

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight">Journey Timeline</h2>
          <p className="text-slate-500 text-sm font-medium">Your upcoming itinerary at a glance.</p>
        </div>
        
        <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all">
          View Smart Itinerary
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="relative">
        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x px-2">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative min-w-[300px] group snap-start"
            >
              <div className="p-6 rounded-3xl bg-[#0F1428]/72 border border-white/8 backdrop-blur-xl shadow-2xl transition-all hover:border-cyan-400/20">
                {/* Event Type Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <EventIcon type={event.type} />
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {event.type}
                    </div>
                  </div>
                  
                  {event.completed ? (
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <div className="text-[10px] font-bold text-cyan-400/80 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                      UPCOMING
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={14} className="text-slate-600" />
                      <span className="text-xs font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={14} className="text-slate-600" />
                      <span className="text-xs font-medium truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Connection Line (Visual) */}
                {index < events.length - 1 && (
                  <div className="absolute top-1/2 -right-6 h-[1px] w-6 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Add Item Placeholder */}
          <div className="min-w-[120px] flex items-center justify-center">
            <button className="h-full w-full rounded-3xl border-2 border-dashed border-white/5 hover:border-white/10 flex items-center justify-center group transition-all">
              <Plus size={24} className="text-slate-700 group-hover:text-slate-500 transition-colors" />
            </button>
          </div>
        </div>

        {/* Shadow Fades for Scroll */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#070B14] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#070B14] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

const Plus = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
