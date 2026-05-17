import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExplorerHero } from '@/components/explorer/ExplorerHero';
import { ExplorerFilters } from '@/components/explorer/ExplorerFilters';
import { CountrySelector } from '@/components/explorer/CountrySelector';
import { TrendingCarousel } from '@/components/explorer/TrendingCarousel';
import { ExperienceRail } from '@/components/explorer/ExperienceRail';
import { DestinationGrid } from '@/components/explorer/DestinationGrid';
import { Sparkles, Compass, MapPin, Globe } from 'lucide-react';
import { countriesData, countryList } from '@/data/countries';

const Discover = () => {
  const [selectedCountry, setSelectedCountry] = useState('Japan');
  const [filter, setFilter] = useState('All');

  const currentCountry = countriesData[selectedCountry] || Object.values(countriesData)[0];

  return (
    <div className="min-h-screen bg-[#050816] text-white pt-12 selection:bg-cyan-500/30">
      <div className="max-w-[1440px] mx-auto space-y-48 pb-60 px-6">
        
        {/* 1. HERO SECTION - Cinematic Polish */}
        <section className="relative">
          <ExplorerHero />
          
          {/* Subtle floating metadata */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-8 items-center text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">
            <div className="flex items-center gap-2"><Globe className="h-3 w-3" /> Global Discovery</div>
            <div className="h-1 w-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2"><Compass className="h-3 w-3" /> Real-time Intel</div>
          </div>
        </section>

        {/* 2. COUNTRY DISCOVERY - High Fidelity Rail */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">Curated Destinations</span>
              </div>
              <h2 className="title-section">Explore by <span className="italic">Country</span></h2>
            </div>
            <p className="body-premium max-w-md text-right md:text-left">
              Select a territory to synchronize your visual feed with local atmospheres and trending hotspots.
            </p>
          </div>
          <CountrySelector 
            countries={countryList}
            selected={selectedCountry} 
            onSelect={setSelectedCountry} 
          />
        </section>

        {/* 3. TRENDING EXPERIENCES - Cinematic Image Rail */}
        <section className="space-y-16">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-3xl font-bold tracking-tighter uppercase italic">Trending in {selectedCountry}</h3>
            <div className="h-px flex-grow bg-white/5 mx-10 hidden md:block" />
            <button className="text-[11px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors">
              View All Hotspots →
            </button>
          </div>
          <TrendingCarousel trending={(currentCountry?.experiences || []).map((e: any) => ({ ...e, country: selectedCountry }))} />
        </section>

        {/* 4. DISCOVERY GRID - Controlled Density */}
        <section className="space-y-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-4">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold tracking-tighter uppercase">Signature Experiences</h3>
              <p className="text-slate-500 text-sm font-medium">Curated by our AI Intelligence engine based on traveler sentiment.</p>
            </div>
            <ExplorerFilters active={filter} onSelect={setFilter} />
          </div>
          
          <div className="grid grid-cols-1 gap-40">
            <ExperienceRail 
              title="Cultural Immersion" 
              subtitle="Deep dives into local traditions and heritage"
              experiences={(currentCountry?.cities || []).filter((d: any) => d.tags?.includes('Culture') || d.tags?.includes('Heritage'))} 
            />
            
            <ExperienceRail 
              title="Modern Energy" 
              subtitle="The pulse of the city and contemporary hotspots"
              experiences={(currentCountry?.cities || []).filter((d: any) => d.tags?.includes('City') || d.tags?.includes('Nightlife') || d.tags?.includes('Neon'))} 
            />

            <ExperienceRail 
              title="Natural Sanctuaries" 
              subtitle="Quiet escapes and breathtaking landscapes"
              experiences={(currentCountry?.cities || []).filter((d: any) => d.tags?.includes('Nature') || d.tags?.includes('Coastal') || d.tags?.includes('Zen'))} 
            />
          </div>
        </section>

        {/* 5. VOYAGE AI PROMPT - The Gateway */}
        <section className="pt-20">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-20 rounded-[64px] bg-gradient-to-br from-cyan-600/10 via-blue-600/5 to-purple-600/10 border border-white/5 text-center space-y-10 relative overflow-hidden group shadow-4xl"
          >
            <div className="relative z-10 space-y-6">
              <div className="h-16 w-16 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mx-auto group-hover:scale-110 transition-transform duration-700">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Ready to Strategize?</h2>
              <p className="body-premium max-w-2xl mx-auto">
                Transform these visual inspirations into a structured, autonomous itinerary using our Voyage Intelligence engine.
              </p>
              <button 
                onClick={() => window.location.href = '/voyage-ai'}
                className="px-16 py-7 rounded-[28px] bg-white text-slate-900 font-black text-[13px] uppercase tracking-[0.4em] hover:bg-slate-200 transition-all shadow-5xl cursor-pointer"
              >
                Launch Voyage AI
              </button>
            </div>
            
            {/* Ambient light effects */}
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-1000" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all duration-1000" />
          </motion.div>
        </section>

      </div>

      {/* Ambient page-wide lighting */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/5 blur-[180px] rounded-full" />
      </div>
    </div>
  );
};

export default Discover;
