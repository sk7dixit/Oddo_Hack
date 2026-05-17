import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Cloud, MapPin, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CityCard = ({ city, index, isActive, onClick }: { city: any, index: number, isActive: boolean, onClick: () => void }) => {
  return (
    <Draggable draggableId={city.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            "group relative overflow-hidden rounded-[24px] border transition-all duration-300 mb-4 cursor-pointer",
            isActive 
              ? "bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
              : "bg-white/5 border-white/10 hover:border-white/20",
            snapshot.isDragging && "scale-105 shadow-2xl z-50 border-cyan-400"
          )}
          onClick={onClick}
        >
          <div className="relative h-24 w-full">
            <img src={city.image} alt={city.name} className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="absolute inset-0 p-4 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{city.name}</h3>
                <p className="text-[10px] text-slate-300 font-medium">{city.dates}</p>
              </div>
              <div {...provided.dragHandleProps} className="p-2 text-white/50 hover:text-white transition-colors">
                <GripVertical className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Cloud className="h-3 w-3 text-cyan-400" />
              {city.weather}
            </div>
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-2 py-0.5 rounded">
              {city.activitiesCount} Activities
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export const CitySidebar = ({ cities, activeCityId, onCitySelect, onReorder }: { cities: any[], activeCityId: string, onCitySelect: (id: string) => void, onReorder: (result: any) => void }) => {
  return (
    <div className="w-80 shrink-0 space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          Destinations
        </h2>
        <button className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10">
          +
        </button>
      </div>

      <DragDropContext onDragEnd={onReorder}>
        <Droppable droppableId="cities">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="custom-scrollbar h-[calc(100vh-420px)] overflow-y-auto pr-2">
              {cities.map((city, index) => (
                <CityCard 
                  key={city.id} 
                  city={city} 
                  index={index} 
                  isActive={activeCityId === city.id}
                  onClick={() => onCitySelect(city.id)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
