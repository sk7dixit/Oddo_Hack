import React, { useState } from 'react';
import type { UserProfile, UpdateProfileInput } from '../../types/user';

interface ProfileFormProps {
  user: UserProfile;
  onSave: (data: UpdateProfileInput) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState<UpdateProfileInput>({
    name: user.name,
    bio: user.bio,
    instagramId: user.instagramId || '',
    facebookId: user.facebookId || '',
  });

  const [errors, setErrors] = useState<Partial<UpdateProfileInput>>({});

  const validate = () => {
    const newErrors: Partial<UpdateProfileInput> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
        <input 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
        />
        {errors.name && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.name}</span>}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email</label>
        <input 
          value={user.email}
          disabled
          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'not-allowed' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Instagram ID</label>
          <input 
            value={formData.instagramId}
            onChange={(e) => setFormData(prev => ({ ...prev, instagramId: e.target.value }))}
            placeholder="@username"
            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Facebook ID</label>
          <input 
            value={formData.facebookId}
            onChange={(e) => setFormData(prev => ({ ...prev, facebookId: e.target.value }))}
            placeholder="username"
            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Bio</label>
        <textarea 
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          rows={4}
          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary" 
          style={{ flex: 1, padding: '12px' }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className="btn glass-morphism" 
          style={{ flex: 1, padding: '12px' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
