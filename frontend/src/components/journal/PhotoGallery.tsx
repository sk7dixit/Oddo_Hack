import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

export const PhotoGallery = ({ photos }: { photos: any[] }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <ImageIcon className="h-5 w-5 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Photo Memories</h2>
        </div>
        <button className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">Open Gallery</button>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative rounded-[32px] overflow-hidden border border-white/10 break-inside-avoid shadow-xl group cursor-pointer"
          >
            <img src={photo} alt="Gallery" className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-white uppercase tracking-widest">May 2026</span>
              <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <ImageIcon className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
