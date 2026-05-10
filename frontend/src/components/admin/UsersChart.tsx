import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  data: { month: string; users: number }[];
}

const UsersChart = ({ data }: Props) => {
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
      <h2 className="text-xl font-bold text-[#111827] mb-4">User Growth</h2>
      
      <div className="w-full h-[160px] md:h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="month" 
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
              contentStyle={{ 
                backgroundColor: '#FFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '11px'
              }}
              itemStyle={{ color: '#8B5CF6', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke="#8B5CF6" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorUsers)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UsersChart;
