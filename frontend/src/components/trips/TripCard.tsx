import React from 'react';
import type { Trip } from '../../types/trip';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#10b981';
      case 'Planning': return 'var(--primary)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="card glass-morphism" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ 
        height: '160px', 
        backgroundImage: trip.image ? `url(${trip.image})` : 'none',
        backgroundColor: trip.image ? 'transparent' : 'rgba(255,255,255,0.05)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        {!trip.image && <span style={{ fontSize: '3rem' }}>✈️</span>}
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{trip.title}</h3>
          <span style={{ 
            fontSize: '0.7rem', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            background: `${getStatusColor(trip.status)}22`, 
            color: getStatusColor(trip.status), 
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {trip.status}
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px', lineHeight: '1.4' }}>
          {trip.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <span>📅</span>
          <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
