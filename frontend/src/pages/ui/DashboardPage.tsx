import React from 'react';
import { useTrips } from '../../hooks/useTrips';
import TripCard from '../../components/trips/TripCard';
import { Link } from 'react-router-dom';
import TiltCard from '../../components/ui/TiltCard';

const DashboardPage: React.FC = () => {
  const { trips, loading, error } = useTrips();

  if (loading) {
    return <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading your dashboard...</div>;
  }

  if (error) {
    return <div style={{ padding: '60px', textAlign: 'center', color: 'var(--error)' }}>{error}</div>;
  }

  const confirmedTrips = trips.filter(t => t.status === 'Confirmed');
  const planningTrips = trips.filter(t => t.status === 'Planning');

  const journeyImages = [
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512453979798-5eaad0df3b03?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=800'
  ];

  return (
    <div className="dashboard-content animate-fade-in" style={{ padding: '20px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
        {/* Left Column */}
        <div className="left-col">
          <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              My Journeys <span style={{ fontSize: '1.2rem' }}>✨</span>
            </h2>
            <Link to="/trips" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              View All <span>›</span>
            </Link>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '50px' }}>
            {trips.length > 0 ? trips.slice(0, 4).map((trip, idx) => (
              <TiltCard key={trip.id}>
                <div className="card" style={{ 
                  height: '240px',
                  padding: '0',
                  overflow: 'hidden',
                  position: 'relative',
                  border: 'none',
                  background: 'transparent'
                }}>
                  {/* Background Image */}
                  <div style={{ 
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${journeyImages[idx % journeyImages.length]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="badge" style={{ 
                        background: trip.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.2)', 
                        color: trip.status === 'Confirmed' ? '#10b981' : '#a78bfa',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 10px'
                      }}>
                        {trip.status}
                      </span>
                      <h3 style={{ color: '#fff', fontSize: '1.4rem', marginTop: '12px', fontWeight: 700 }}>{trip.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{trip.status} Trip</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                      <span style={{ fontSize: '1rem' }}>📅</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            )) : (
              <div className="card" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '60px' }}>
                <p style={{ color: 'var(--text-muted)' }}>No journeys yet. Ready to explore?</p>
                <button className="btn btn-primary" style={{ marginTop: '20px' }}>Start Planning</button>
              </div>
            )}
          </div>

          <section className="upcoming-plans">
            <header style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>📅</span>
              <h2 style={{ fontSize: '1.6rem' }}>Upcoming Plans</h2>
            </header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {trips.length > 0 ? planningTrips.slice(0, 3).map(trip => (
                <div key={trip.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 24px', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>20</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>MAR</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{trip.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>8:00 AM - 10:00 AM</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>Planning</span>
                    <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>⋮</div>
                  </div>
                </div>
              )) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No upcoming plans.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="right-col">
          <header style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>📈</span>
            <h2 style={{ fontSize: '1.6rem' }}>Statistics</h2>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '50px' }}>
            <div className="card" style={{ padding: '20px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '15px' }}>
                <span style={{ color: 'var(--primary)' }}>✔️</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Confirmed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
                <div style={{ width: '4px', height: '40px', background: 'var(--primary)', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '2.4rem', lineHeight: 1 }}>{confirmedTrips.length}</h3>
              </div>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '15px' }}>
                <span style={{ color: 'var(--warning)' }}>⭐</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Points</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
                <div style={{ width: '4px', height: '40px', background: 'var(--warning)', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '2.4rem', lineHeight: 1 }}>1,250</h3>
              </div>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '15px' }}>
                <span style={{ color: 'var(--accent)' }}>⏳</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>In Progress</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
                <div style={{ width: '4px', height: '40px', background: 'var(--accent)', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '2.4rem', lineHeight: 1 }}>02</h3>
              </div>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '15px' }}>
                <span style={{ color: 'var(--success)' }}>✅</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Tasks Done</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
                <div style={{ width: '4px', height: '40px', background: 'var(--success)', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '2.4rem', lineHeight: 1 }}>14</h3>
              </div>
            </div>
          </div>

          <section className="activity">
            <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>📊</span>
                <h2 style={{ fontSize: '1.6rem' }}>Activity</h2>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                This Week <span>▼</span>
              </div>
            </header>
            <div className="card" style={{ padding: '30px 20px', height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
              {[30, 60, 40, 95, 70, 85, 55].map((h, i) => (
                <div key={i} style={{ 
                  width: '28px', 
                  height: `${h}%`, 
                  background: i === 3 ? 'linear-gradient(to top, var(--primary), var(--secondary))' : 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '14px',
                  position: 'relative',
                  boxShadow: i === 3 ? '0 10px 20px rgba(65, 105, 225, 0.3)' : 'none'
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 10px 0', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </section>
        </div>
      </div>
      
      <footer style={{ marginTop: '60px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
        Let's keep exploring the world 🌍
      </footer>
    </div>
  );
};

export default DashboardPage;
