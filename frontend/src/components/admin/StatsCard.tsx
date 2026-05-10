import React from 'react';

interface StatsCardProps {
  label: string;
  value: number | string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => {
  return (
    <div className="stats-card">
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;
