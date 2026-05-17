import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Wallet, 
  Sparkles, Compass, Hotel, ArrowRight 
} from 'lucide-react';
import { useTripStore } from '@/stores/tripStore';

interface FormData {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  style: string;
  budget: number;
}

const TravelStylePills = ({ selected, onSelect }: { selected: string, onSelect: (val: string) => void }) => {
  const styles = [
    { id: 'adventure', label: 'Adventure', icon: Compass },
    { id: 'luxury', label: 'Luxury', icon: Sparkles },
    { id: 'backpacking', label: 'Backpacking', icon: Wallet },
    { id: 'nature', label: 'Nature', icon: Hotel },
    { id: 'cultural', label: 'Cultural', icon: MapPin }
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {styles.map((style) => {
        const Icon = style.icon;
        const isSelected = selected === style.id;
        return (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border
              ${isSelected 
                ? 'bg-cyan-400 border-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
              }
            `}
          >
            <Icon className="h-3.5 w-3.5" />
            {style.label}
          </button>
        );
      })}
    </div>
  );
};

export const JourneyForm = ({ onUpdate }: { onUpdate: (data: FormData) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 'solo',
    style: 'adventure',
    budget: 80000,
  });

  const updateFormData = (newData: Partial<FormData>) => {
    const updated = { ...formData, ...newData };
    setFormData(updated);
    onUpdate(updated);
  };

  const addTrip = useTripStore((state) => state.addTrip);
  const setActiveTrip = useTripStore((state) => state.setActiveTrip);

  const handleSubmit = () => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      title: formData.name,
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'planning' as const
    };

    addTrip(newTrip);
    setActiveTrip(newTrip);
    navigate(`/itinerary-builder/${newTrip.id}`);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-8">
        {/* ROW 1: Name & Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Journey Name</label>
            <div className="relative group">
              <Compass className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="e.g., Summer Europe Escape"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                className="w-full h-[58px] rounded-[18px] bg-white/5 border border-white/5 pl-14 pr-6 text-white text-sm font-medium focus:outline-none focus:border-cyan-400/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Destination</label>
            <div className="relative group">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Where are you going?"
                value={formData.destination}
                onChange={(e) => updateFormData({ destination: e.target.value })}
                className="w-full h-[58px] rounded-[18px] bg-white/5 border border-white/5 pl-14 pr-6 text-white text-sm font-medium focus:outline-none focus:border-cyan-400/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* ROW 2: Dates & Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Start Date</label>
            <div className="relative group">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none" />
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => updateFormData({ startDate: e.target.value })}
                className="w-full h-[58px] rounded-[18px] bg-white/5 border border-white/5 pl-14 pr-6 text-white text-sm font-medium focus:outline-none focus:border-cyan-400/50 transition-all [color-scheme:dark]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">End Date</label>
            <div className="relative group">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none" />
              <input 
                type="date" 
                value={formData.endDate}
                onChange={(e) => updateFormData({ endDate: e.target.value })}
                className="w-full h-[58px] rounded-[18px] bg-white/5 border border-white/5 pl-14 pr-6 text-white text-sm font-medium focus:outline-none focus:border-cyan-400/50 transition-all [color-scheme:dark]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Travelers</label>
            <div className="relative group">
              <Users className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <select 
                value={formData.travelers}
                onChange={(e) => updateFormData({ travelers: e.target.value })}
                className="w-full h-[58px] rounded-[18px] bg-white/5 border border-white/5 pl-14 pr-6 text-white text-sm font-medium focus:outline-none focus:border-cyan-400/50 transition-all appearance-none"
              >
                <option value="solo">Solo</option>
                <option value="couple">Couple</option>
                <option value="family">Family</option>
                <option value="group">Group</option>
              </select>
            </div>
          </div>
        </div>

        {/* ROW 3: Style & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Budget Preference</label>
            <div className="relative group">
              <Wallet className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="number" 
                placeholder="Estimated budget (INR)"
                value={formData.budget}
                onChange={(e) => updateFormData({ budget: parseInt(e.target.value) })}
                className="w-full h-[58px] rounded-[18px] bg-white/5 border border-white/5 pl-14 pr-6 text-white text-sm font-medium focus:outline-none focus:border-cyan-400/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Choose Your Style</label>
            <TravelStylePills 
              selected={formData.style} 
              onSelect={(val) => updateFormData({ style: val })} 
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end pt-10 border-t border-white/5">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-cyan-400 text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(34,211,238,0.2)] hover:bg-cyan-300 hover:scale-105 transition-all active:scale-95"
        >
          Start Travel Story
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
