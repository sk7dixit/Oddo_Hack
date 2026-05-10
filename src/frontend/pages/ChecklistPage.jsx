import React from "react";

const ChecklistPage = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Packing Checklist</h1>
        <p className="text-gray-500 mt-2">Manage your essentials for a stress-free trip.</p>
      </header>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Skeleton content */}
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-400">
          Checklist feature implementation coming in Phase 5...
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;
