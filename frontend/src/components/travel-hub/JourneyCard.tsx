import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wallet, Map } from 'lucide-react';

interface JourneyProps {
  journey: {
    id: string;
    title: string;
    location: string;
    dates: string;
    progress: number;
    image: string;
    budget: string;
    collaborators: string[];
  };
}

export const JourneyCard: React.FC<JourneyProps> = ({ journey }) => {
  return (
    <div className="group relative h-[260px] w-full min-w-[300px] lg:w-[300px] shrink-0 overflow-hidden rounded-[24px] border border-white/8 bg-[#070B14] shadow-xl">
      {/* Background Image */}
      <img 
        src={journey.image} 
        alt={journey.title} 
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="mb-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[9px] font-bold tracking-widest text-white border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ACTIVE
          </div>
          <div className="flex -space-x-2">
            {journey.collaborators.map((avatar, i) => (
              <img 
                key={i} 
                src={avatar} 
                className="h-6 w-6 rounded-full border-2 border-[#070B14]" 
                alt="user"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white">{journey.title}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mt-1">
              <Calendar className="h-3 w-3 text-cyan-400" />
              {journey.dates}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-white">
              <span className="flex items-center gap-1.5">
                <Wallet className="h-3 w-3 text-cyan-400" />
                {journey.budget}
              </span>
              <span>{journey.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${journey.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActiveJourneys = ({ journeys }: { journeys: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Map className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Active Journeys</h2>
        </div>
        <button className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors">
          View All
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {journeys.map((journey) => (
          <div key={journey.id} className="snap-center">
            <JourneyCard journey={journey} />
          </div>
        ))}
      </div>
    </div>
  );
};
