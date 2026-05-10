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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <Router>
      <div className="app">
        <nav className="nav glass-morphism">
          <Link to="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>
            TRAVELOOP
          </Link>
          <div className="nav-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
            <Link to="/trips" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Trips</Link>
          </div>
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'flex-end', position: 'relative' }}>
            {user && (
              <ProfileAvatar 
                name={user.name} 
                avatar={user.avatar} 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
              />
            )}
            {isMenuOpen && <ProfileMenu onClose={() => setIsMenuOpen(false)} />}
          </div>
        </nav>

        <main className="container" style={{ marginTop: '60px' }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/trips/create" element={<CreateTripPage />} />
            <Route path="/trips/:id" element={<TripDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <footer style={{ marginTop: '100px', padding: '40px', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>&copy; 2026 TRAVELOOP. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
