import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import ProfileForm from '../../components/auth/ProfileForm';
import ProfilePhotoUpload from '../../components/auth/ProfilePhotoUpload';
import { userService } from '../../services/userService';

const ProfilePage: React.FC = () => {
  const { user, loading, error, updateProfile, refresh } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (loading && !user) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>Loading profile...</div>;
  }

  const handlePhotoSuccess = async (url: string) => {
    try {
      await userService.updateAvatar(url);
      refresh(); // Sync global state
      setLocalError(null);
    } catch (err) {
      setLocalError('Failed to save profile photo URL');
    }
  };

  const handlePhotoError = (err: string) => {
    setLocalError(err);
  };

  if (error || localError) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p style={{ color: 'var(--error)', marginBottom: '20px', fontSize: '1.1rem' }}>{error || localError}</p>
        <button 
          onClick={() => { setLocalError(null); refresh(); }} 
          className="btn btn-primary"
          style={{ padding: '10px 24px' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) return null;

  const handleSave = async (data: any) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (err) {
      // Handled by hook
    }
  };

  return (
    <div className="profile-container" style={{ padding: '40px 0' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <ProfilePhotoUpload 
          currentAvatar={user.avatar} 
          onUploadSuccess={handlePhotoSuccess} 
          onUploadError={handlePhotoError} 
        />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>{user.name}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{user.email}</p>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {isEditing ? (
          <div className="card glass-morphism">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '25px' }}>Edit Profile</h2>
            <ProfileForm 
              user={user} 
              onSave={handleSave} 
              onCancel={() => setIsEditing(false)} 
              loading={loading} 
            />
          </div>
        ) : (
          <div className="card glass-morphism">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '1.5rem' }}>About Me</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="btn glass-morphism"
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
              >
                Edit Profile
              </button>
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Bio</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{user.bio || 'No bio yet.'}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>Instagram</span>
                <span style={{ fontWeight: 600 }}>{user.instagramId || 'Not set'}</span>
              </div>
              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>Facebook</span>
                <span style={{ fontWeight: 600 }}>{user.facebookId || 'Not set'}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>Member Since</span>
                <span style={{ fontWeight: 600 }}>May 2026</span>
              </div>
              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>Status</span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>Active Explorer</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
