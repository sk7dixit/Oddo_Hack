import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JournalHero } from '@/components/journal/JournalHero';
import { FeaturedMemory } from '@/components/journal/FeaturedMemory';
import { MemoryTimeline } from '@/components/journal/MemoryTimeline';
import { JournalEntryCard } from '@/components/journal/JournalEntryCard';
import { PhotoGallery } from '@/components/journal/PhotoGallery';
import { MoodTags } from '@/components/journal/MoodTags';
import { journalData } from '@/data/journalData';
import { Plus } from 'lucide-react';

const Journal = () => {
  const [selectedMood, setSelectedMood] = useState('Peaceful');

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20 relative">
      {/* 1. Hero */}
      <JournalHero />

      {/* 2. Featured Memory */}
      <FeaturedMemory memory={journalData.featured} />

      {/* 3. Filter & Add Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-2">
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Filter by mood</p>
          <MoodTags selected={selectedMood} onSelect={setSelectedMood} />
        </div>
        <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-xl shadow-violet-500/20 hover:scale-105 transition-all">
          <Plus className="h-5 w-5" /> Write Entry
        </button>
      </div>

      {/* 4. Main Journal Split View */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: Timeline */}
        <MemoryTimeline timeline={journalData.timeline} />

        {/* Right: Entries */}
        <div className="flex-1 space-y-8">
          {journalData.entries.map((entry) => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}
          
          <button className="w-full py-10 rounded-[32px] border border-dashed border-white/10 text-sm font-bold text-slate-500 hover:text-white hover:border-white/20 transition-all flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-slate-500">
              <Plus className="h-6 w-6" />
            </div>
            Continue your story...
          </button>
        </div>
      </div>

      {/* 5. Photo Gallery */}
      <PhotoGallery photos={journalData.photos} />

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[30%] left-[-10%] w-[40%] h-[40%] bg-violet-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-400/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default Journal;
