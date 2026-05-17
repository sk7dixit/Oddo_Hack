import React from 'react';

export const BudgetSlider = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Est. Budget</span>
        <span className="text-xl font-bold text-cyan-400 tabular-nums">
          {formatCurrency(value)}
        </span>
      </div>
      
      <div className="relative group">
        <input 
          type="range" 
          min="20000" 
          max="500000" 
          step="5000"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
        />
        <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <span>₹20K</span>
          <span>₹5L</span>
        </div>
      </div>
      
      <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-[10px] text-slate-400 leading-relaxed italic">
        "Approximate estimate including transport, stays, and activities based on your travel style."
      </div>
    </div>
  );
};
