import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  country: string;
  title: string;
  image: string;
}

export const VoyageCinematicHero = ({ country, title, image }: HeroProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-[600px] w-full overflow-hidden rounded-[64px] mb-20 shadow-4xl group"
    >
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={`${image}&w=1600&q=80`}
        alt={country}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      
      {/* Immersive Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070B14]/80 via-transparent to-transparent" />
      
      <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em]">Destinations Unleashed</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none italic">
            {country}
          </h1>
          
          <p className="text-2xl md:text-3xl font-medium text-slate-200 tracking-tight max-w-2xl leading-tight">
            {title}
          </p>
        </motion.div>
      </div>

      {/* Decorative glass elements */}
      <div className="absolute top-12 right-12 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] font-black text-white uppercase tracking-widest">Cinematic Discovery Active</span>
      </div>
    </motion.div>
  );
};
