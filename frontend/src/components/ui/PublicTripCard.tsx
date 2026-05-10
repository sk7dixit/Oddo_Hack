import React from 'react';

interface PublicTripCardProps {
  title: string;
  destination: string;
  author: string;
}

const PublicTripCard: React.FC<PublicTripCardProps> = ({ title, destination, author }) => {
  return (
    <div className="public-trip-card">
      <h3>{title}</h3>
      <p>{destination}</p>
      <small>By {author}</small>
    </div>
  );
};

export default PublicTripCard;
