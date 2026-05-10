import React from 'react';
import { useTrips } from '../../hooks/useTrips';
import TripCard from '../../components/trips/TripCard';
import { Link } from 'react-router-dom';

const MyTripsPage: React.FC = () => {
  const { trips, loading, error } = useTrips();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>Loading your trips...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--error)' }}>{error}</div>;
  }

  return (
    <div className="trips-container" style={{ padding: '40px 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>My Trips</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage all your past and upcoming adventures.</p>
        </div>
        <Link to="/trips/create" className="btn btn-primary" style={{ textDecoration: 'none' }}>+ Create New Trip</Link>
      </header>

      {trips.length === 0 ? (
        <div className="card glass-morphism" style={{ textAlign: 'center', padding: '80px' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>🗺️</span>
          <h2 style={{ marginBottom: '10px' }}>No trips yet</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>You haven't created any trips. Start your first adventure today!</p>
          <Link to="/trips/create" className="btn btn-primary">Create Trip</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;
