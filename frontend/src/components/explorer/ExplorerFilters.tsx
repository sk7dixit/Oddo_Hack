import React from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export const ExplorerFilters = ({ onFilterChange }: FiltersProps) => {
  const filterOptions = [
    { label: 'Budget', options: ['₹20k–₹50k', '₹50k–₹1.5L', '₹1.5L+'] },
    { label: 'Travel Type', options: ['Adventure', 'Luxury', 'Solo', 'Family'] },
    { label: 'Season', options: ['Spring', 'Summer', 'Autumn', 'Winter'] },
    { label: 'Duration', options: ['1-3 Days', '4-7 Days', '8-14 Days'] }
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-slate-400">
        <Filter className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
      </div>

      {filterOptions.map((filter) => (
        <div key={filter.label} className="relative group">
          <button className="flex items-center gap-3 px-5 py-3 bg-slate-900/40 border border-white/10 rounded-2xl text-slate-300 hover:border-cyan-400/30 transition-all">
            <span className="text-sm font-bold">{filter.label}</span>
            <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>
          
          {/* Dropdown Placeholder (Hackathon style - looks real, works enough) */}
          <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-2xl backdrop-blur-xl">
            {filter.options.map((opt) => (
              <button 
                key={opt}
                className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 ml-auto">
        Clear All
      </button>
    </div>
  );
};
