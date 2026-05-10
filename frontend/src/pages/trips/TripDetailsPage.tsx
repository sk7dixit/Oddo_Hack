import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import type { Trip } from '../../types/trip';

const TripDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await tripService.getTripById(id);
        setTrip(data);
      } catch (err) {
        setError('Failed to load trip details. It may have been deleted.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) return;
    
    try {
      setIsDeleting(true);
      await tripService.deleteTrip(id);
      navigate('/trips');
    } catch (err) {
      alert('Failed to delete trip.');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>Loading trip details...</div>;
  }

  if (error || !trip) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p style={{ color: 'var(--error)', marginBottom: '20px' }}>{error || 'Trip not found'}</p>
        <Link to="/trips" className="btn glass-morphism">Back to Trips</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div>
          <Link to="/trips" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-block', marginBottom: '15px' }}>&larr; Back to Trips</Link>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{trip.title}</h1>
          <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)' }}>
            <span>📅 {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
            <span>|</span>
            <span style={{ 
              color: trip.status === 'Confirmed' ? '#10b981' : trip.status === 'Planning' ? 'var(--primary)' : 'var(--text-muted)' 
            }}>
              {trip.status}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn glass-morphism" 
            style={{ padding: '8px 16px', color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Trip'}
          </button>
        </div>
      </header>

      <div className="card glass-morphism" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>About this trip</h2>
        <p style={{ lineHeight: '1.6', color: trip.description ? 'white' : 'var(--text-muted)' }}>
          {trip.description || 'No description provided for this trip.'}
        </p>
      </div>

      <div className="card glass-morphism" style={{ padding: '30px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Itinerary building and maps coming in the next phase!</p>
      </div>
    </div>
  );
};

export default TripDetailsPage;
