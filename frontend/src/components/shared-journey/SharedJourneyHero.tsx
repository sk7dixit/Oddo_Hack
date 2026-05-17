import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Globe } from 'lucide-react';

export const SharedJourneyHero = () => {
  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-400 border border-cyan-500/20"
      >
        <Users2 className="h-3.5 w-3.5" />
        <span className="uppercase tracking-widest">Collaborative Planning</span>
      </motion.div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
          Shared Journey <span className="text-blue-500">🌍</span>
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-2xl">
          Plan together. Explore together. Experience the world with your favorite travel crew in real-time.
        </p>
      </div>

      <div className="flex items-center gap-6 pt-4">
        <div className="flex -space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="h-12 w-12 rounded-full border-4 border-[#070B14] overflow-hidden"
            >
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="avatar" />
            </motion.div>
          ))}
          <div className="h-12 w-12 rounded-full border-4 border-[#070B14] bg-white/5 flex items-center justify-center text-xs font-bold text-white backdrop-blur-md">
            +5
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
          <Globe className="h-3.5 w-3.5 animate-spin-slow" />
          9 Active Explorers
        </div>
      </div>
    </div>
  );
};
