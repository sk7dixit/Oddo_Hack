import React from "react";
import { Info, Moon } from "lucide-react";

const PreferencesSettings = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280]">
            <Moon size={20} />
          </div>
          <div>
            <h3 className="text-[#111827] font-bold text-sm">Dark Mode</h3>
            <p className="text-xs text-[#6B7280]">Enable dark mode for the admin dashboard</p>
          </div>
        </div>
        <button className="w-12 h-6 bg-zinc-200 rounded-full relative cursor-not-allowed opacity-50">
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm"></span>
        </button>
      </div>
      
      <div className="flex items-start gap-3 bg-fuchsia-50 px-4 py-3 rounded-xl border border-fuchsia-100">
        <Info size={16} className="text-fuchsia-600 mt-0.5 shrink-0" />
        <p className="text-xs text-fuchsia-700 leading-relaxed">
          The Traveloop Admin Panel is permanently set to <span className="font-bold">Aurora Light Mode</span> to maintain design consistency during the hackathon phase.
        </p>
      </div>
    </div>
  );
};

export default PreferencesSettings;
