import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, LogOut, Sparkles, Map, 
  Heart, History, Wallet, Users, Zap, ShieldCheck 
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/stores/authStore';

import { getInitials } from '@/utils/getInitials';

interface IdentityMenuProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
}

export const IdentityMenu = ({ user, isOpen, onClose, onOpenSettings }: IdentityMenuProps) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for closing */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full right-0 mt-3 w-72 bg-[#0A0F1E]/95 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-6xl overflow-hidden z-[101]"
          >
            {/* 1. Profile Summary - Compact */}
            <div className="p-5 border-bottom border-white/5 bg-gradient-to-br from-white/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-black text-white shadow-lg">
                    {getInitials(user.name)}
                  </div>
                  {user.aiStatus.isSyncActive && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-cyan-400 border-2 border-[#0A0F1E] shadow-[0_0_10px_#22d3ee]" />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold text-base leading-tight">{user.name}</h4>
                  <p className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mt-1 opacity-80">
                    {user.travelStyle}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1.5 mt-5">
                {[
                  { label: 'Countries', value: user.stats.countries },
                  { label: 'Trips', value: user.stats.trips },
                  { label: 'Memories', value: user.stats.memories }
                ].map(stat => (
                  <div key={stat.label} className="text-center p-1.5 rounded-lg bg-white/5">
                    <div className="text-white font-bold text-[12px]">{stat.value}</div>
                    <div className="text-[7px] font-black text-slate-500 uppercase tracking-tighter">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Quick Access - Tighter Spacing */}
            <div className="p-1.5">
              <div className="px-3 py-1.5 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                Travel Intelligence
              </div>
              <div className="space-y-0.5">
                {[
                  { icon: Map, label: 'My Journeys', detail: '3 Active' },
                  { icon: Heart, label: 'Saved Trips', detail: '12 Items' },
                  { icon: Sparkles, label: 'AI Preferences', detail: 'Adventure' },
                  { icon: History, label: 'Travel Memories', detail: 'New' },
                  { icon: Wallet, label: 'Budget Intel', detail: 'Healthy' }
                ].map(item => (
                  <button 
                    key={item.label}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-[13px] font-medium text-slate-300 group-hover:text-white">{item.label}</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 group-hover:text-cyan-500/50">{item.detail}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Voyage AI Status - Compact */}
            <div className="m-2.5 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-cyan-400" />
                  <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">AI Context Active</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                Memory Sync Enabled • Collaborative Mode
              </p>
            </div>

            {/* 4. Account Actions - Tighter */}
            <div className="p-1.5 border-t border-white/5">
              {[
                { icon: Settings, label: 'Settings', onClick: onOpenSettings },
                { icon: ShieldCheck, label: 'Security' },
                { icon: LogOut, label: 'Logout', color: 'text-red-400/60 hover:text-red-400', onClick: handleLogout }
              ].map(item => (
                <button 
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 transition-all group ${item.color || 'text-slate-400 hover:text-white'}`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  <span className="text-[13px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
