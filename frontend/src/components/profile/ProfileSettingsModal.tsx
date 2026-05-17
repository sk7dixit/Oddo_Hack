import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Sparkles, Map, 
  Shield, Zap, Camera, Globe, 
  Compass, Heart, Check 
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import type { User as UserType, UserPreferences } from '@/stores/authStore';
import { getInitials } from '@/utils/getInitials';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSettingsModal = ({ isOpen, onClose }: ProfileSettingsModalProps) => {
  const { user, updateProfile, updatePreferences } = useAuthStore();
  
  const [activeTab, setActiveTab] = useState<'identity' | 'ai' | 'preferences'>('identity');
  
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl h-[80vh] bg-[#050816] border border-white/10 rounded-[48px] overflow-hidden flex flex-col shadow-6xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">Intelligence Console</h2>
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mt-1">Refining Your Traveler Identity</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="h-10 w-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Layout Body */}
            <div className="flex-grow flex overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-64 border-r border-white/5 p-6 space-y-2">
                {[
                  { id: 'identity', label: 'Basic Identity', icon: User },
                  { id: 'ai', label: 'AI Personality', icon: Sparkles },
                  { id: 'preferences', label: 'Travel Prefs', icon: Map }
                ].map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all group ${
                      activeTab === tab.id 
                        ? 'bg-white/5 text-cyan-400 border border-white/5' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                    <span className="text-[13px] font-bold uppercase tracking-widest">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
                {activeTab === 'identity' && (
                  <div className="space-y-12">
                    <section className="space-y-6">
                      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Public Profile</h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-white uppercase tracking-widest ml-1">Full Name</label>
                          <input 
                            type="text" 
                            value={user.name}
                            onChange={(e) => updateProfile({ name: e.target.value })}
                            className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 focus:border-cyan-400/30 text-white text-sm outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-white uppercase tracking-widest ml-1">Traveler Type</label>
                          <input 
                            type="text" 
                            value={user.travelStyle}
                            onChange={(e) => updateProfile({ travelStyle: e.target.value })}
                            className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 focus:border-cyan-400/30 text-white text-sm outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-3 pt-4">
                        <label className="text-[11px] font-black text-white uppercase tracking-widest ml-1">Bio Intelligence</label>
                        <textarea 
                          value={user.bio}
                          onChange={(e) => updateProfile({ bio: e.target.value })}
                          rows={4}
                          className="w-full p-4 rounded-3xl bg-white/5 border border-white/5 focus:border-cyan-400/30 text-white text-sm outline-none transition-all resize-none"
                        />
                      </div>
                    </section>

                    <section className="p-6 rounded-[32px] bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black text-white shadow-xl">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="text-white font-bold">Avatar System</p>
                          <p className="text-[10px] text-slate-500 font-medium">Auto-generated based on identity</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                        Change Initials
                      </button>
                    </section>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-12">
                    <section className="space-y-6">
                      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Personality Alignment</h3>
                      <p className="text-slate-400 text-sm max-w-xl">
                        Select the core values that will train Voyage AI to curate your journeys.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'adventure', label: 'Adventure Focus', icon: Compass },
                          { id: 'luxury', label: 'Luxury & Comfort', icon: Shield },
                          { id: 'culture', label: 'Cultural Heritage', icon: Globe },
                          { id: 'cinematic', label: 'Cinematic Visuals', icon: Camera },
                          { id: 'nightlife', label: 'Vibrant Nightlife', icon: Zap },
                          { id: 'nature', label: 'Quiet Nature', icon: Heart }
                        ].map((item: any) => (
                          <button
                            key={item.id}
                            onClick={() => updatePreferences({ [item.id]: !((user.preferences as any)[item.id]) })}
                            className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                              (user.preferences as any)[item.id]
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-4 w-4" />
                              <span className="text-[13px] font-bold uppercase tracking-widest">{item.label}</span>
                            </div>
                            {(user.preferences as any)[item.id] && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-12">
                    <section className="space-y-8">
                      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Operational Parameters</h3>
                      
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-white uppercase tracking-widest ml-1">Travel Pace</label>
                        <div className="flex gap-4">
                          {['relaxed', 'balanced', 'fast'].map((p) => (
                            <button
                              key={p}
                              onClick={() => updatePreferences({ pace: p as any })}
                              className={`flex-grow p-4 rounded-2xl border transition-all uppercase text-[10px] font-black tracking-widest ${
                                user.preferences.pace === p
                                  ? 'bg-white text-slate-900 border-white'
                                  : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/10'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-white uppercase tracking-widest ml-1">Budget Strategy</label>
                        <div className="flex gap-4">
                          {['backpacking', 'standard', 'luxury'].map((b) => (
                            <button
                              key={b}
                              onClick={() => updatePreferences({ budget: b as any })}
                              className={`flex-grow p-4 rounded-2xl border transition-all uppercase text-[10px] font-black tracking-widest ${
                                user.preferences.budget === b
                                  ? 'bg-white text-slate-900 border-white'
                                  : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/10'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Sync Active</span>
              </div>
              <button 
                onClick={onClose}
                className="px-10 py-4 rounded-2xl bg-white text-slate-900 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-5xl"
              >
                Save & Synchronize
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
