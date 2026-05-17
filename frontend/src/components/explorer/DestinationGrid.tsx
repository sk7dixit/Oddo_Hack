import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, ArrowRight, Thermometer, Banknote, Utensils, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DestinationCard = ({ dest, index, onClick }: { dest: any, index: number, onClick: () => void }) => {
  const navigate = useNavigate();

  const handleExploreMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/discover/${dest.country.toLowerCase()}/${dest.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/40 backdrop-blur-xl hover:border-cyan-400/30 transition-all duration-500 shadow-2xl"
    >
      {/* Top Section: Image & Badges */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={dest.image} 
          alt={dest.name || dest.city} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-slate-950/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-amber-400 font-bold text-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400" />
          {dest.rating}
        </div>

        {/* Season Badge */}
        <div className="absolute top-4 right-4 rounded-full bg-cyan-500/20 backdrop-blur-md px-3 py-1.5 border border-cyan-500/30 text-cyan-400 font-bold text-[10px] uppercase tracking-widest">
          {dest.bestTime || dest.bestSeason}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Middle Section: City & Country */}
        <div>
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
            {dest.name || dest.city}
          </h3>
          <p className="flex items-center gap-1 text-sm text-slate-400 font-medium mt-1">
            <MapPin className="h-3.5 w-3.5 text-cyan-500" />
            {dest.country}
          </p>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Thermometer className="h-4 w-4 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Temp</span>
              <span className="text-sm font-bold text-slate-200">{dest.weather}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Banknote className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Budget</span>
              <span className="text-sm font-bold text-slate-200">{dest.budget}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="h-8 w-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <Utensils className="h-4 w-4 text-pink-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Food</span>
              <span className="text-sm font-bold text-slate-200 truncate max-w-[80px]">{dest.famousFood || 'Local'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Stay</span>
              <span className="text-sm font-bold text-slate-200">{dest.idealStay || '3-5 Days'}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {dest.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button 
            onClick={handleExploreMore}
            className="flex-1 h-12 rounded-2xl bg-cyan-400 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors"
          >
            Explore More
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group/btn">
            <Heart className="h-5 w-5 text-slate-400 group-hover/btn:text-rose-500 transition-colors" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const DestinationGrid = ({ destinations, onSelect }: { destinations: any[], onSelect: (dest: any) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {destinations.map((dest, i) => (
        <DestinationCard key={dest.id} dest={dest} index={i} onClick={() => onSelect(dest)} />
      ))}
    </div>
  );
};

