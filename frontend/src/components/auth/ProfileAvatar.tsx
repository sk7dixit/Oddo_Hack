import React from 'react';

interface ProfileAvatarProps {
  name: string;
  avatar?: string;
  onClick: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, avatar, onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        border: '2px solid var(--glass-border)',
        padding: '0',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {avatar ? (
        <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: '1.2rem' }}>👤</span>
      )}
    </button>
  );
};

export default ProfileAvatar;
