import React from 'react';
import { useTrips } from '../../hooks/useTrips';
import TripCard from '../../components/trips/TripCard';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { trips, loading, error } = useTrips();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>Loading your adventures...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--error)' }}>{error}</div>;
  }

  const activeTripsCount = trips.filter(t => t.status === 'Confirmed').length;
  const planningTripsCount = trips.filter(t => t.status === 'Planning').length;

  return (
    <div className="dashboard-container" style={{ padding: '40px 0' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Welcome back, Explorer! 🌍</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Here's what's happening with your travels.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="card glass-morphism" style={{ borderLeft: '4px solid var(--primary)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Planning</span>
          <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>{planningTripsCount}</h2>
        </div>
        <div className="card glass-morphism" style={{ borderLeft: '4px solid #10b981' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Confirmed</span>
          <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>{activeTripsCount}</h2>
        </div>
        <div className="card glass-morphism" style={{ borderLeft: '4px solid #f59e0b' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Trips</span>
          <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>{trips.length}</h2>
        </div>
      </div>

      <section className="recent-trips">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Upcoming Adventures</h2>
          <Link to="/trips/create" className="btn btn-primary" style={{ padding: '8px 16px', textDecoration: 'none' }}>+ New Trip</Link>
        </div>

        {trips.length === 0 ? (
          <div className="card glass-morphism" style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>No trips found. Time to start planning!</p>
            <Link to="/trips/create" className="btn btn-primary">Start Your First Trip</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {trips.slice(0, 3).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
