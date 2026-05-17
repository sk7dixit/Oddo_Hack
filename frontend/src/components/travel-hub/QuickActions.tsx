import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Globe, Wallet, Package, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LaunchCardProps {
  title: string;
  subtitle: string;
  description?: string;
  icon: any;
  path: string;
  image: string;
  status?: string;
  isPrimary?: boolean;
}

const LaunchCard: React.FC<LaunchCardProps> = ({ 
  title, 
  subtitle, 
  description, 
  icon: Icon, 
  path, 
  image, 
  status,
  isPrimary 
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[32px] border border-white/8 bg-[#0F1428]/72 shadow-2xl transition-all hover:border-cyan-400/30 backdrop-blur-xl",
        isPrimary ? "col-span-full p-10 h-[280px]" : "p-6 h-[220px]"
      )}
    >
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#070B14] via-[#070B14]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className={cn(
            "flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md",
            isPrimary ? "h-16 w-16" : "h-12 w-12"
          )}>
            <Icon className={cn(
              "text-white transition-transform duration-500 group-hover:scale-110",
              isPrimary ? "h-8 w-8" : "h-6 w-6"
            )} />
          </div>
          
          {status && (
            <div className="flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3 py-1 border border-cyan-400/20 text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {status}
            </div>
          )}
        </div>

        <div className={cn("mt-auto", isPrimary ? "space-y-2" : "space-y-1")}>
          <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">
            {subtitle}
          </p>
          <h3 className={cn(
            "font-bold text-white tracking-tight leading-tight",
            isPrimary ? "text-4xl" : "text-xl"
          )}>
            {title}
          </h3>
          {isPrimary && description && (
            <p className="text-slate-400 text-sm max-w-md font-medium mt-2">
              {description}
            </p>
          )}
        </div>

        {isPrimary && (
          <div className="mt-8 flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-cyan-400 transition-all group/btn">
              Start Planning
              <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <ShieldCheck size={14} className="text-emerald-500" />
              Enterprise Security Enabled
            </div>
          </div>
        )}
      </div>

      {/* Hover Glow Edge */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Primary Action */}
      <LaunchCard 
        isPrimary
        title="Create New Journey"
        subtitle="Primary Module"
        description="Our AI engine will engineer a perfectly optimized itinerary based on your preferences, budget, and travel style."
        icon={Plus}
        path="/create-trip"
        image="/assets/modules/create-journey.png"
        status="AI Powered"
      />

      {/* Secondary Actions */}
      <LaunchCard 
        title="Explore Feed"
        subtitle="Discovery"
        icon={Globe}
        path="/discover"
        image="/assets/modules/explore.png"
        status="Live Updates"
      />

      <LaunchCard 
        title="Finance Hub"
        subtitle="Budgeting"
        icon={Wallet}
        path="/finance-hub"
        image="/assets/modules/budget.png"
        status="Smart Sync"
      />

      <LaunchCard 
        title="Packing Lab"
        subtitle="Essentials"
        icon={Package}
        path="/packing-center"
        image="/assets/modules/packing.png"
        status="Beta"
      />
    </div>
  );
};
