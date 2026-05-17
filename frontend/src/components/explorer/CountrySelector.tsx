import React from 'react';
import { motion } from 'framer-motion';
import { countriesData } from '@/data/countries';

interface Country {
  name: string;
  flag: string;
}

interface CountrySelectorProps {
  countries: Country[];
  selected: string;
  onSelect: (name: string) => void;
}

export const CountrySelector = ({ countries, selected, onSelect }: CountrySelectorProps) => {
  return (
    <div className="relative group">
      <div className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 snap-x scroll-smooth">
        {(countries || []).map((country) => {
          const isSelected = selected === country.name;
          
          return (
            <motion.button
              key={country.name}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(country.name)}
              className={`
                relative flex-shrink-0 w-48 h-28 rounded-3xl overflow-hidden snap-start
                transition-all duration-300 border-2 bg-slate-900 transform-gpu will-change-transform
                ${isSelected 
                  ? 'border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.25)] ring-4 ring-cyan-400/10' 
                  : 'border-white/5 hover:border-white/20'
                }
              `}
            >
              {/* Background Image with Fallback and Low Res Thumbnail */}
              <div className="absolute inset-0">
                <img 
                  src={`${countriesData[country.name]?.heroImage || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=400'}&w=400&q=60`} 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isSelected ? 'opacity-60' : 'opacity-30 hover:opacity-50'} transform-gpu`}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center gap-1 p-4 z-10">
                <span className="text-3xl mb-1 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  {country.flag}
                </span>
                <span className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${isSelected ? 'text-cyan-400' : 'text-slate-300'}`}>
                  {country.name}
                </span>
              </div>

              {/* Active Indicator - Static for performance (removed layoutId) */}
              {isSelected && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Scroll Indicators - Subtle and optimized */}
      <div className="absolute top-1/2 -left-4 w-12 h-full -translate-y-1/2 bg-gradient-to-r from-[#070B14] to-transparent pointer-events-none opacity-60" />
      <div className="absolute top-1/2 -right-4 w-12 h-full -translate-y-1/2 bg-gradient-to-l from-[#070B14] to-transparent pointer-events-none opacity-60" />
    </div>
  );
};
