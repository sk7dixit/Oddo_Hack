import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Props {
  data: { city: string; count: number }[];
}

const COLORS = ["#8B5CF6", "#A855F7", "#C4B5FD", "#DDD6FE"];

const TopCitiesChart = ({ data }: Props) => {
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
      <h2 className="text-xl font-bold text-[#111827] mb-2">Top Destinations</h2>
      
      <div className="w-full h-[160px] md:h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={6}
              dataKey="count"
              nameKey="city"
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px',
                fontSize: '10px'
              }}
            />
            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '10px', paddingLeft: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TopCitiesChart;
