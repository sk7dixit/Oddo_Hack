import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';
import GlassInput from './GlassInput';
import PasswordInput from './PasswordInput';
import PremiumBackground from './PremiumBackground';
import LoadingModal from './LoadingModal';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CompleteProfile: React.FC = () => {
  const { user, completeProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLoading, setShowLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    if (formData.mobileNumber && !/^\+?[1-9]\d{1,14}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid phone number";
    }
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowLoading(true);
    }
  };

  const handleLoadingComplete = useCallback(() => {
    completeProfile({
      name: formData.fullName,
      mobileNumber: formData.mobileNumber,
    });
    navigate('/travel-hub');
  }, [completeProfile, formData.fullName, formData.mobileNumber, navigate]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4">
      <PremiumBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Sparkles className="size-12 text-blue-400 animate-pulse" />
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
              <User size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Complete Profile</h2>
            <p className="text-zinc-400">Personalize your journey experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassInput 
                label="Full Name"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                error={errors.fullName}
                icon={<User className="size-4" />}
              />
              <GlassInput 
                label="Email (ReadOnly)"
                value={user?.email || ''}
                readOnly
                disabled
                className="opacity-60 cursor-not-allowed"
                icon={<Mail className="size-4" />}
              />
            </div>

            <GlassInput 
              label="Mobile Number"
              placeholder="+1 234 567 890"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
              error={errors.mobileNumber}
              icon={<Phone className="size-4" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PasswordInput 
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
              />
              <PasswordInput 
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                error={errors.confirmPassword}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors"
            >
              <span>Save & Continue</span>
              <ArrowRight className="size-4" />
            </motion.button>
          </form>
        </div>
      </motion.div>

      <LoadingModal 
        isOpen={showLoading} 
        onComplete={handleLoadingComplete} 
      />
    </div>
  );
};

export default CompleteProfile;
