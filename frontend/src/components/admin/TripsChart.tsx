import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

interface Props {
  data: { date: string; count: number }[];
}

const TripsChart = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-[240px] md:h-[280px] flex items-center justify-center">
        <p className="text-[#6B7280] text-sm font-medium">No analytics available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-[240px] md:h-[280px] min-w-0"
    >
      <h2 className="text-xl font-bold text-[#111827] mb-4">Trips Overview</h2>
      
      <div className="w-full h-[160px] md:h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="date" 
              stroke="#94A3B8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#94A3B8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
              cursor={{ fill: '#F8FAFC' }}
              contentStyle={{ 
                backgroundColor: '#FFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '11px'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="#A855F7" 
              radius={[4, 4, 0, 0]} 
              barSize={18}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? "#7C3AED" : "#A855F7"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TripsChart;
