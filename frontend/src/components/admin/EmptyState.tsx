import React from "react";
import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="w-16 h-16 bg-[#F5F7FB] rounded-2xl flex items-center justify-center mb-5 border border-[#E5E7EB]">
        <Inbox className="text-[#6B7280] animate-bounce-subtle" size={32} />
      </div>
      <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
      <p className="text-[#6B7280] text-sm mt-2 max-w-[280px]">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
