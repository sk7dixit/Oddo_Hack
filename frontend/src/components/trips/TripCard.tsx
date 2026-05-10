import React from 'react';
import type { Trip } from '../../types/trip';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'var(--success)';
      case 'Planning': return 'var(--primary)';
      default: return 'var(--text-muted)';
    }
  };

  const placeholderImages = [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=800'
  ];

  const displayImage = trip.image || placeholderImages[Math.abs(trip.id.length) % placeholderImages.length];

  return (
    <div className="card glass-morphism animate-fade-in" style={{ padding: '0', cursor: 'pointer' }}>
      <div style={{ 
        height: '200px', 
        backgroundImage: `url(${displayImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 2
        }}>
          <span className="badge" style={{ 
            background: 'rgba(0,0,0,0.4)', 
            backdropFilter: 'blur(8px)',
            border: `1px solid ${getStatusColor(trip.status)}44`,
            color: getStatusColor(trip.status)
          }}>
            {trip.status}
          </span>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(11, 15, 26, 0.8), transparent)',
          zIndex: 1
        }} />
      </div>
      
      <div style={{ padding: '20px', position: 'relative', zIndex: 2 }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#fff' }}>{trip.title}</h3>
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '0.9rem', 
          marginBottom: '20px', 
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {trip.description || 'No description provided for this adventure.'}
        </p>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span style={{ fontSize: '1rem' }}>📅</span>
            <span>{new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>→</div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;

