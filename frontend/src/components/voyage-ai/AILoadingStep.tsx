import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Globe, Zap } from 'lucide-react';

const steps = [
  { text: "Analyzing destinations...", icon: Globe },
  { text: "Optimizing travel routes...", icon: Zap },
  { text: "Curating local experiences...", icon: Sparkles },
  { text: "Finalizing your intelligence report...", icon: Cpu }
];

export const AILoadingStep = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[600px] mx-auto py-12 flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="h-24 w-24 rounded-full border-2 border-dashed border-cyan-500/30"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-4 w-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
        </motion.div>
      </div>

      <div className="space-y-4 w-full px-12">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          const Icon = step.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isActive || isDone ? 1 : 0.2,
                x: 0,
                color: isActive ? '#22d3ee' : isDone ? '#94a3b8' : '#64748b'
              }}
              className="flex items-center gap-4 py-1"
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-cyan-500/10 border border-cyan-500/20' : ''}`}>
                <Icon className={`h-4 w-4 ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : ''}`}>
                {step.text}
              </span>
              {isDone && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
