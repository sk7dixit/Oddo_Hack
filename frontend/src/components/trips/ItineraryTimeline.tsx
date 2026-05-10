import React from 'react';

interface Stop {
  id: string;
  city: string;
  date: string;
}

interface ItineraryTimelineProps {
  stops: Stop[];
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ stops }) => {
  return (
    <div className="itinerary-timeline">
      {stops.map((stop) => (
        <div key={stop.id} className="timeline-item">
          <span>{stop.date}</span>
          <span>{stop.city}</span>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
