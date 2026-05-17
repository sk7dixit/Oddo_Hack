import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Crown, Backpack, Heart, Landmark } from 'lucide-react';

const iconMap: any = { Mountain, Crown, Backpack, Heart, Landmark };

interface ProfileProps {
  scores: Record<string, number>;
}

export const AITravelerProfile = ({ scores }: ProfileProps) => {
  // Get the top personality
  const personalities = [
    { id: 'adventure', label: 'Adventure Explorer', icon: 'Mountain', color: 'bg-orange-500' },
    { id: 'luxury', label: 'Luxury Escapist', icon: 'Crown', color: 'bg-yellow-500' },
    { id: 'backpacker', label: 'Budget Backpacker', icon: 'Backpack', color: 'bg-green-500' },
    { id: 'romantic', label: 'Romantic Traveler', icon: 'Heart', color: 'bg-pink-500' },
    { id: 'cultural', label: 'Cultural Wanderer', icon: 'Landmark', color: 'bg-cyan-500' }
  ];

  const topPersonality = personalities.reduce((prev, current) => 
    (scores[current.id] > scores[prev.id]) ? current : prev
  );

  return (
    <div className="max-w-[920px] mx-auto px-4 mb-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-8 rounded-[40px] bg-white/5 border border-white/10 overflow-hidden group shadow-2xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Personality Icon */}
          <div className={`h-24 w-24 rounded-3xl ${topPersonality.color} flex items-center justify-center text-slate-900 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
            {React.createElement(iconMap[topPersonality.icon], { className: "h-12 w-12" })}
          </div>

          <div className="flex-grow space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Your Travel Personality</span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {topPersonality.label}
              </h2>
            </div>
            
            {/* Personality Scores */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {personalities.map((p) => (
                <div key={p.id} className="space-y-1.5 min-w-[100px]">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>{p.id}</span>
                    <span>{scores[p.id]}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scores[p.id]}%` }}
                      className={`h-full ${p.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 pt-4 md:pt-0">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
              Personality Matched
            </div>
          </div>
        </div>

        {/* Cinematic glow based on top personality */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${topPersonality.color.replace('bg-', 'bg-')}/10 blur-[100px] -mr-32 -mt-32`} />
      </motion.div>
    </div>
  );
};
