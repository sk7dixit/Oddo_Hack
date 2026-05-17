import React from 'react';
import { cn } from '@/lib/utils';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const GlassInput: React.FC<GlassInputProps> = ({ label, error, icon, className, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-medium text-white/70 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-3 text-sm text-white transition-all outline-none",
            "focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 placeholder:text-white/40",
            icon && "pl-11",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/10 to-emerald-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity blur-xl" />
      </div>
      {error && <p className="text-[10px] font-medium text-red-400 ml-1">{error}</p>}
    </div>
  );
};

export default GlassInput;
