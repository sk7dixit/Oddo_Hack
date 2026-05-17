import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Plane, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoadingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const steps = [
  { id: 1, text: "Signing you up...", icon: <Loader2 className="animate-spin" /> },
  { id: 2, text: "Creating your account...", icon: <Sparkles className="text-amber-400" /> },
  { id: 3, text: "Preparing dashboard...", icon: <Plane className="text-blue-400" /> },
  { id: 4, text: "Welcome aboard!", icon: <CheckCircle2 className="text-emerald-400" /> },
];

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        
        clearInterval(interval);
        const timeout = setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#10b981', '#f59e0b']
          });
          onComplete();
        }, 1000);
        
        return prev;
      });
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-3xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-black/40 p-8 text-center shadow-2xl"
          >
            <div className="mb-8 flex justify-center">
              <motion.div
                key={currentStep}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white"
              >
                {React.cloneElement(steps[currentStep].icon as React.ReactElement, { size: 32 })}
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl font-bold text-white"
                >
                  {steps[currentStep].text}
                </motion.h3>
              </AnimatePresence>
              <div className="flex justify-center gap-1.5 mt-6">
                {steps.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      scale: idx === currentStep ? 1.2 : 1,
                      backgroundColor: idx === currentStep ? '#3b82f6' : 'rgba(255,255,255,0.1)'
                    }}
                    className="h-1.5 w-8 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingModal;
