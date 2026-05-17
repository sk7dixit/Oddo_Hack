import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Zap } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export const HeroSection = () => {
  const { user } = useAuthStore();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const timeEmoji = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️';
    if (hour < 17) return '🌤️';
    return '🌙';
  }, []);

  if (!user) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[48px] border border-white/5 bg-[#070B14] p-8 lg:p-14 shadow-4xl group"
    >
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Side: Welcome & Search */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 border border-white/5 shadow-sm">
              <Sparkles className="h-3 w-3" />
              <span>Intelligence Active</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-white leading-[1.1] italic uppercase">
              {greeting}, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-500 pr-4">
                {user.name}
              </span> {timeEmoji}
            </h1>
            
            <p className="text-base text-slate-500 font-medium max-w-lg leading-relaxed">
              Welcome back to your <span className="text-white italic">Travel Intelligence Console</span>. 
              {user.aiStatus.activeJourney ? ` Your ${user.aiStatus.activeJourney} strategy is synchronized.` : ' Ready for your next cinematic world?'}
            </p>
          </div>

          <div className="relative max-w-xl group/search">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-600 group-focus-within/search:text-cyan-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search destinations, cities, or vibes..."
              className="w-full rounded-[24px] bg-white/5 border border-white/10 py-5 pl-16 pr-8 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/30 transition-all shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side: High Fidelity Featured Card */}
        <div className="w-full lg:w-[420px] shrink-0">
          <div className="group relative h-[260px] overflow-hidden rounded-[36px] border border-white/10 bg-[#070B14] shadow-6xl">
            <img 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" 
              alt="Tokyo" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-3 w-3 text-cyan-400" />
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Active Stream</span>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight uppercase italic pr-2">{user.name.split(' ')[0]}'s Japan Strategy</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Status: Synchronized</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-sm font-black">
                  88%
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '88%' }}
                  transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
