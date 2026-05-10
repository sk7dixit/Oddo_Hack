import React from 'react';
import { useTrips } from '../../hooks/useTrips';
import TripCard from '../../components/trips/TripCard';
import { Link } from 'react-router-dom';

const MyTripsPage: React.FC = () => {
  const { trips, loading, error } = useTrips();

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="animate-fade-in" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
          🚢 Loading your adventures...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="glass-morphism animate-fade-in" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', border: '1px solid var(--error)22' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '20px' }}>⚠️</span>
          <h2 style={{ color: 'var(--error)', marginBottom: '10px' }}>Connection Error</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-outline">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 0' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        marginBottom: '60px',
        position: 'relative'
      }}>
        <div>
          <span className="badge" style={{ background: 'var(--primary)22', color: 'var(--primary)', marginBottom: '16px', display: 'inline-block' }}>
            Adventure Planner
          </span>
          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>My Trips</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '12px' }}>
            Explored {trips.length} destinations across the globe.
          </p>
        </div>
        <Link to="/trips/create" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          <span>+</span> Create New Trip
        </Link>
      </header>

      {trips.length === 0 ? (
        <div className="glass-morphism stagger-1" style={{ textAlign: 'center', padding: '100px 40px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '30px' }}>🗺️</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Your map is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>
            The world is waiting for you. Start planning your first trip and we'll help you organize everything.
          </p>
          <Link to="/trips/create" className="btn btn-primary">Start Planning Now</Link>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '40px' 
        }}>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;
