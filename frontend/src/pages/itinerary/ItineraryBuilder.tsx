import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { JourneyHeader } from '@/components/itinerary/JourneyHeader';
import { CitySidebar } from '@/components/itinerary/CitySidebar';
import { DayCard } from '@/components/itinerary/DayCard';
import { BudgetSidebar } from '@/components/itinerary/BudgetSidebar';
import { mockItineraryData } from '@/data/mockItinerary';

const ItineraryBuilder = () => {
  const { tripId } = useParams();
  const [cities, setCities] = useState(mockItineraryData.cities);
  const [activeCityId, setActiveCityId] = useState(cities[0].id);

  const activeCity = cities.find(c => c.id === activeCityId) || cities[0];

  const handleReorder = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(cities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCities(items);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
      {/* 1. Header */}
      <JourneyHeader 
        title={mockItineraryData.title}
        summary={mockItineraryData.summary}
        dates={mockItineraryData.dates}
        image={mockItineraryData.image}
        collaborators={mockItineraryData.collaborators}
        progress={mockItineraryData.progress}
      />

      {/* 2. Main Builder Layout */}
      <div className="flex gap-8 items-start">
        
        {/* Left: City Sidebar */}
        <CitySidebar 
          cities={cities} 
          activeCityId={activeCityId}
          onCitySelect={setActiveCityId}
          onReorder={handleReorder}
        />

        {/* Center: Day Planner */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between px-4 mb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {activeCity.name} Itinerary
              </h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {activeCity.dates} • {activeCity.days.length} Days
              </p>
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all">
              + Add Day
            </button>
          </div>

          <div className="space-y-2">
            {activeCity.days.length > 0 ? (
              activeCity.days.map((day) => (
                <DayCard key={day.id} day={day} />
              ))
            ) : (
              <div className="py-20 text-center space-y-6 premium-card border-dashed">
                <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">No days planned for {activeCity.name}</h3>
                  <p className="text-sm text-slate-500">Start building your perfect journey by adding the first day.</p>
                </div>
                <button className="px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold hover:scale-105 transition-all">
                  Initialize Itinerary
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Budget & Stats */}
        <BudgetSidebar budget={mockItineraryData.budget} />
      </div>
    </div>
  );
};

export default ItineraryBuilder;
