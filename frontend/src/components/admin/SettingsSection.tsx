import React from "react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

const SettingsSection = ({ title, description, children }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#111827]">{title}</h2>
        <p className="text-sm text-[#6B7280] mt-1">{description}</p>
      </div>
      <div className="bg-[#F5F7FB]/50 rounded-xl p-4 border border-[#E5E7EB]/50">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;
