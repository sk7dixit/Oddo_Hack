import React from 'react';

interface StopCardProps {
  city: string;
  arrivalDate: string;
  departureDate: string;
  notes?: string;
}

const StopCard: React.FC<StopCardProps> = ({ city, arrivalDate, departureDate, notes }) => {
  return (
    <div className="stop-card">
      <h4>{city}</h4>
      <p>{arrivalDate} – {departureDate}</p>
      {notes && <p>{notes}</p>}
    </div>
  );
};

export default StopCard;
