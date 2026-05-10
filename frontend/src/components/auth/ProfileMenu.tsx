import React from 'react';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  return (
    <div 
      className="glass-morphism"
      style={{ 
        position: 'absolute', 
        top: '60px', 
        right: '0', 
        width: '200px', 
        zIndex: 1000,
        padding: '8px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}
    >
      <Link 
        to="/profile" 
        onClick={onClose}
        style={{ 
          display: 'block', 
          padding: '12px 16px', 
          color: 'var(--text)', 
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        My Profile
      </Link>
      <Link 
        to="/trips" 
        onClick={onClose}
        style={{ 
          display: 'block', 
          padding: '12px 16px', 
          color: 'var(--text)', 
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        My Trips
      </Link>
      <div style={{ height: '1px', background: 'var(--glass-border)', margin: '8px 0' }}></div>
      <button 
        style={{ 
          width: '100%',
          textAlign: 'left',
          padding: '12px 16px', 
          color: 'var(--error)', 
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileMenu;
