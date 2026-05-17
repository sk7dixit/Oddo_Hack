import React, { useState } from 'react';
import { Zap, Bell, Search, Sparkles } from 'lucide-react';
import { IdentityMenu } from './IdentityMenu';
import { ProfileSettingsModal } from '../profile/ProfileSettingsModal';
import { useAuthStore } from '@/stores/authStore';
import { getInitials } from '@/utils/getInitials';

export const TopHeader = () => {
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-[32px] bg-[#0A0F1E]/60 backdrop-blur-3xl border border-white/10 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-[14px] bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white leading-none">TraveLoop</span>
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em] mt-1">Voyage Intelligence</span>
            </div>
          </div>

          {/* Search Intelligence */}
          <div className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/5 group focus-within:border-cyan-400/30 transition-all duration-500">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search your world..." 
              className="bg-transparent border-none text-[13px] font-medium text-white placeholder:text-slate-600 focus:outline-none w-64"
            />
          </div>

          {/* Identity & Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative h-10 w-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-cyan-400 border-2 border-[#0A0F1E] shadow-[0_0_8px_#22d3ee]" />
            </button>

            <div className="h-6 w-px bg-white/10 mx-2" />

            {/* Identity Cluster */}
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 p-1 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
              >
                <div className="text-right hidden sm:block px-2">
                  <p className="text-[13px] font-bold text-white leading-none">{user.name}</p>
                  <div className="flex items-center justify-end gap-1 mt-1.5">
                    <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{user.travelStyle}</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                    <div className="h-full w-full rounded-[14px] bg-[#0A0F1E] flex items-center justify-center text-sm font-black text-white">
                      {getInitials(user.name)}
                    </div>
                  </div>
                  {/* Status Indicator */}
                  {user.aiStatus.activeJourney && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-[#0A0F1E] shadow-sm" title="Active Journey" />
                  )}
                </div>
              </button>

              {/* Premium Command Menu */}
              <IdentityMenu 
                user={user} 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                onOpenSettings={() => {
                  setIsMenuOpen(false);
                  setIsSettingsOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <ProfileSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};
