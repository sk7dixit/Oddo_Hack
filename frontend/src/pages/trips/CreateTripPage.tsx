import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import TripForm from '../../components/trips/TripForm';
import type { CreateTripInput } from '../../types/trip';

const CreateTripPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTrip = async (data: CreateTripInput) => {
    setLoading(true);
    setError(null);
    try {
      await tripService.createTrip(data);
      navigate('/trips');
    } catch (err) {
      setError('Failed to create trip. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-morphism" style={{ padding: '40px', borderRadius: '24px' }}>
        <h1 style={{ marginBottom: '10px' }}>Plan a New Trip</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Where would you like to go next? Fill in the details to start planning your adventure.
        </p>

        {error && (
          <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: '12px', color: 'var(--error)', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <TripForm 
          onSubmit={handleCreateTrip} 
          onCancel={() => navigate('/trips')} 
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreateTripPage;
