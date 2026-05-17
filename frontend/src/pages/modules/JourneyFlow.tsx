import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JourneyHeader } from '@/components/journey/JourneyHeader';
import { JourneyForm } from '@/components/journey/JourneyForm';
import { JourneyPreviewCard } from '@/components/journey/JourneyPreviewCard';

const CreateJourney = () => {
  const [previewData, setPreviewData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 'solo',
    style: 'adventure',
    budget: 80000,
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20 pt-10 relative">
      {/* Refined Background elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] bg-cyan-400/5 blur-[100px] rounded-full" />
      </div>

      <div className="space-y-12">
        {/* Header - Minimal & Premium */}
        <JourneyHeader />

        {/* Main Content: Form + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Compact Premium Planner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <div className="p-10 md:p-12 rounded-[48px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
              <JourneyForm onUpdate={setPreviewData} />
            </div>
          </motion.div>

          {/* Right: Live Journey Snapshot */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <JourneyPreviewCard data={previewData} />
          </motion.div>
        </div>
      </div>
    </div>
  );

};

export default CreateJourney;
