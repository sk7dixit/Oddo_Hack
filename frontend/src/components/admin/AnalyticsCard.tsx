import React from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string;
}

const AnalyticsCard = ({ title, value }: Props) => {
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
      className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#E5E7EB] transition-all duration-300 cursor-default"
    >
      <p className="text-sm font-medium text-[#6B7280]">{title}</p>
      <h3 className="text-3xl font-bold text-[#111827] mt-2 tracking-tight">{value}</h3>
    </motion.div>
  );
};

export default AnalyticsCard;
