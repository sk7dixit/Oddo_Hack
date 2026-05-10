import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = ["#8B5CF6", "#A855F7", "#C4B5FD", "#DDD6FE"];

const ActivityAnalyticsChart = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-[280px] md:h-[320px] flex items-center justify-center">
        <p className="text-[#6B7280] text-sm font-medium">No activity data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-[280px] md:h-[320px] min-w-0"
    >
      <h2 className="text-xl font-bold text-[#111827] mb-4">Activity Distribution</h2>
      
      <div className="w-full h-[180px] md:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
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
                fontSize: '11px'
              }}
            />
            <Legend verticalAlign="bottom" height={30} wrapperStyle={{ fontSize: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ActivityAnalyticsChart;
