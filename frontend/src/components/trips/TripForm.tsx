import React, { useState } from 'react';
import type { CreateTripInput } from '../../types/trip';

interface TripFormProps {
  initialData?: CreateTripInput;
  onSubmit: (data: CreateTripInput) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState<CreateTripInput>(initialData || {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateTripInput, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof CreateTripInput, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Trip Title</label>
        <input 
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="e.g. Summer in Santorini"
          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
        />
        {errors.title && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.title}</span>}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description (Optional)</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="What are you planning to do?"
          rows={3}
          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Start Date</label>
          <input 
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
          />
          {errors.startDate && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.startDate}</span>}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>End Date</label>
          <input 
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
          />
          {errors.endDate && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.endDate}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary" 
          style={{ flex: 1, padding: '12px' }}
        >
          {loading ? 'Saving...' : 'Save'}
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

export default TripForm;
