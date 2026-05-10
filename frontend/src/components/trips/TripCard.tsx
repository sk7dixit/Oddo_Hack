import React from 'react';

interface TripCardProps {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}

const TripCard: React.FC<TripCardProps> = ({ title, destination, startDate, endDate }) => {
  return (
    <div className="trip-card">
      <h3>{title}</h3>
      <p>{destination}</p>
      <p>{startDate} – {endDate}</p>
    </div>
  );
};

export default TripCard;
