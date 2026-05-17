import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart } from 'lucide-react';

export const FeaturedMemory = ({ memory }: { memory: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative h-[440px] w-full rounded-[48px] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
    >
      <img 
        src={memory.image} 
        alt={memory.title} 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
      
      <div className="absolute inset-0 p-12 flex flex-col justify-end">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white border border-white/10 backdrop-blur-md">
              <Heart className="h-3 w-3 text-red-400 fill-red-400" />
              FEATURED MEMORY
            </div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{memory.date}</div>
          </div>

          <div className="space-y-2">
            <h2 className="text-5xl font-bold text-white tracking-tight leading-tight">{memory.title}</h2>
            <p className="flex items-center gap-2 text-slate-300 font-medium">
              <MapPin className="h-4 w-4 text-violet-400" />
              {memory.location}
            </p>
          </div>

          <p className="text-lg text-slate-400 leading-relaxed italic">
            "{memory.description}"
          </p>
          
          <button className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all backdrop-blur-md">
            View Full Story
          </button>
        </div>
      </div>
    </motion.div>
  );
};
