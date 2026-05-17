import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Sparkles, Map } from 'lucide-react';

interface PreviewData {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  style: string;
  budget: number;
}

export const JourneyPreviewCard = ({ data }: { data: PreviewData }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'TBD';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="sticky top-24 w-full rounded-[48px] overflow-hidden border border-white/5 bg-[#0D121F] shadow-3xl"
    >
      {/* Background Image with subtle reveal */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800" 
          alt="Preview" 
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] to-transparent" />
        
        <div className="absolute top-6 left-6">
          <div className="px-4 py-1.5 rounded-full bg-cyan-400/10 backdrop-blur-xl border border-cyan-400/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
            Snapshot
          </div>
        </div>
      </div>

      <div className="p-10 space-y-8">
        {/* Title & Location */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tighter leading-none">
            {data.name || 'Untitled Journey'}
          </h2>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
            <MapPin className="h-4 w-4 text-cyan-500" />
            {data.destination || 'Destination TBD'}
          </div>
        </div>

        {/* Vital Stats Strip */}
        <div className="flex items-center justify-between py-6 border-y border-white/5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Duration</span>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" />
              {formatDate(data.startDate)} — {formatDate(data.endDate)}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Exp. Budget</span>
            <div className="text-cyan-400 font-black text-lg">
              ₹{(data.budget / 1000).toFixed(0)}K
            </div>
          </div>
        </div>

        {/* Mini Itinerary Preview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Map className="h-3 w-3" />
            Preliminary Route
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((day) => (
              <div key={day} className="flex items-center gap-4 group">
                <div className="h-8 w-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:border-cyan-400/30 group-hover:text-cyan-400 transition-all">
                  0{day}
                </div>
                <div className="flex-1 h-px bg-white/5 group-hover:bg-cyan-400/20 transition-all" />
                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-400 transition-all italic">Route being optimized...</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Style Badge */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
            <span className="capitalize">{data.style}</span> Mode
          </div>
        </div>
      </div>
    </motion.div>
  );
};
