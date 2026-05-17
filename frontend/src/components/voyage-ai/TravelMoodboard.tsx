import React from 'react';
import { motion } from 'framer-motion';

interface MoodboardProps {
  images: string[];
  country: string;
}

export const TravelMoodboard = ({ images, country }: MoodboardProps) => {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="h-px flex-grow bg-white/5" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] whitespace-nowrap">
          {country} Atmosphere Moodboard
        </span>
        <div className="h-px flex-grow bg-white/5" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className={`relative overflow-hidden rounded-[32px] border border-white/5 shadow-2xl transition-all duration-500 cursor-zoom-in group ${
              i === 0 || i === 3 ? 'aspect-[4/5] md:translate-y-8' : 'aspect-[4/5]'
            }`}
          >
            <img 
              src={`${img}&w=600&q=75`} 
              alt={`${country} vibe`} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center pt-8">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center max-w-md leading-loose">
          A visual collection of sensory moments, local textures, and cultural snapshots curated by Voyage AI.
        </p>
      </div>
    </div>
  );
};
