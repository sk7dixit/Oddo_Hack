import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PackingHero } from '@/components/packing/PackingHero';
import { PackingProgress } from '@/components/packing/PackingProgress';
import { CategorySidebar } from '@/components/packing/CategorySidebar';
import { PackingList } from '@/components/packing/PackingList';
import { SmartEssentials } from '@/components/packing/SmartEssentials';
import { PackingTemplates } from '@/components/packing/PackingTemplates';
import { packingData } from '@/data/packingData';

const Packing = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(packingData.categories[0].id);
  const [items, setItems] = useState(packingData.items);

  const activeItems = items.filter(item => item.category === activeCategoryId);
  
  const handleToggle = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const packedCount = items.filter(i => i.packed).length;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* 1. Hero */}
      <PackingHero />

      {/* 2. Progress */}
      <PackingProgress total={items.length} packed={packedCount} />

      {/* 3. Main Split View */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Sidebar */}
        <CategorySidebar 
          categories={packingData.categories} 
          activeId={activeCategoryId} 
          onSelect={setActiveCategoryId} 
        />

        {/* Main List */}
        <PackingList 
          items={activeItems} 
          onToggle={handleToggle} 
        />
      </div>

      {/* 4. Smart Suggestions */}
      <SmartEssentials essentials={packingData.smartEssentials} />

      {/* 5. Templates */}
      <PackingTemplates templates={packingData.templates} />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[30%] right-[-5%] w-[30%] h-[30%] bg-violet-400/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default Packing;
