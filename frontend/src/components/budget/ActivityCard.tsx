import React from 'react';

interface ActivityCardProps {
  name: string;
  city: string;
  cost: number;
  currency?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ name, city, cost, currency = 'INR' }) => {
  return (
    <div className="activity-card">
      <h4>{name}</h4>
      <p>{city}</p>
      <p>{currency} {cost.toLocaleString()}</p>
    </div>
  );
};

export default ActivityCard;
