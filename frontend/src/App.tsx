import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/ui/DashboardPage';
import MyTripsPage from './pages/trips/MyTripsPage';
import CreateTripPage from './pages/trips/CreateTripPage';
import TripDetailsPage from './pages/trips/TripDetailsPage';
import ProfilePage from './pages/auth/ProfilePage';
import ProfileAvatar from './components/auth/ProfileAvatar';
import ProfileMenu from './components/auth/ProfileMenu';
import { useUser } from './hooks/useUser';

const App = () => {
  const { user } = useUser();

  return (
    <Router>
      <div className="app">
        {/* Horizontal Header */}
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link to="/" className="logo" style={{ 
              fontSize: '1.6rem', 
              fontWeight: 800, 
              fontFamily: 'Outfit',
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              letterSpacing: '-0.02em'
            }}>
              <div style={{ 
                width: '44px', 
                height: '44px', 
                borderRadius: '12px', 
                background: '#4169e1', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.4rem',
                boxShadow: '0 4px 15px rgba(65, 105, 225, 0.4)'
              }}>
                ✈️
              </div>
              <span style={{ background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                TRAVELOOP
              </span>
            </Link>

            <nav className="nav-menu" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
              <Link to="/" className="nav-item active">
                <span className="nav-icon">🏠</span>
                <span>Overview</span>
              </Link>
              <Link to="/trips" className="nav-item">
                <span className="nav-icon">✈️</span>
                <span>My Trips</span>
              </Link>
              <Link to="/profile" className="nav-item">
                <span className="nav-icon">👤</span>
                <span>Profile</span>
              </Link>
            </nav>
          </div>

          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {user && (
              <Link to="/profile" className="user-profile animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>{user.name}</p>
                  <p style={{ fontSize: '0.7rem', color: '#4169e1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explorer Member</p>
                </div>
                <div style={{ position: 'relative' }}>
                  <img 
                    src={user.avatar || 'https://i.pravatar.cc/150?u=traveloop'} 
                    alt="Avatar" 
                    style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '14px', 
                      border: '2px solid rgba(255,255,255,0.1)',
                      padding: '2px'
                    }} 
                  />
                  <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', background: '#10b981', border: '2px solid #0b0f1a', borderRadius: '50%' }} />
                </div>
              </Link>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="page-content" style={{ padding: '40px' }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/trips" element={<MyTripsPage />} />
              <Route path="/trips/create" element={<CreateTripPage />} />
              <Route path="/trips/:id" element={<TripDetailsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
