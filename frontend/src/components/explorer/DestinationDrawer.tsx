import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Wallet, Calendar, MapPin, Plus, Star, Map as MapIcon } from 'lucide-react';

export const DestinationDrawer = ({ destination, isOpen, onClose }: { destination: any, isOpen: boolean, onClose: () => void }) => {
  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#070B14] border-l border-white/10 z-[110] overflow-y-auto custom-scrollbar shadow-2xl"
          >
            {/* Header / Image */}
            <div className="relative h-80 w-full">
              <img src={destination.image} className="h-full w-full object-cover" alt={destination.city} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all backdrop-blur-md"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-white">{destination.rating} Rating</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white tracking-tight">{destination.city}</h2>
                  <p className="flex items-center gap-2 text-slate-300 font-medium">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    {destination.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-10 space-y-12">
              {/* Overview Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Cloud className="h-5 w-5 text-cyan-400 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Weather</p>
                  <h4 className="text-sm font-bold text-white mt-1">{destination.weather}</h4>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Wallet className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Budget</p>
                  <h4 className="text-sm font-bold text-white mt-1">{destination.budget}</h4>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Calendar className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Best Season</p>
                  <h4 className="text-sm font-bold text-white mt-1">{destination.bestSeason}</h4>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Overview</h3>
                <p className="text-slate-400 leading-relaxed">
                  {destination.description} Explore the vibrant streets, rich history, and breathtaking landscapes of {destination.city}. This destination is perfect for travelers seeking {destination.tags.join(', ')}.
                </p>
              </div>

              {/* Attractions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapIcon className="h-5 w-5 text-cyan-400" />
                  Top Attractions
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {destination.attractions.map((attr: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyan-400/30 transition-all cursor-pointer">
                      <div className="h-10 w-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                        {i + 1}
                      </div>
                      <span className="text-sm font-bold text-white">{attr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-10 flex gap-4">
                <button className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add to Journey
                </button>
                <button className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                  Wishlist
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
