import React from 'react';
import { motion } from 'framer-motion';

export const JourneyHeader = () => {
  return (
    <div className="space-y-2">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-2"
      >
        Create Your Journey
      </motion.div>
      
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
          Design Your <span className="text-cyan-400">Perfect Trip</span>
        </h1>
        <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed">
          Build personalized journeys with destinations, schedules and experiences tailored to your style.
        </p>
      </div>
    </div>
  );
};
