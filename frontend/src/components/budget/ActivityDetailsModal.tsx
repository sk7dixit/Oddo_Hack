import React, { useEffect } from 'react';
import { useBudget } from '../../context/BudgetContext';

interface ActivityDetailsModalProps {
  activity: any;
  onClose: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activity, onClose }) => {
  const { addActivity, updateActivityQuantity, selectedActivities } = useBudget();
  const [localQty, setLocalQty] = React.useState(1);

  const getQuantity = () => {
    const act = selectedActivities.find(a => a.id === activity.id);
    return act ? act.quantity : 0;
  };

  useEffect(() => {
    const currentQty = getQuantity();
    if (currentQty > 0) setLocalQty(currentQty);
  }, [activity.id]);

  const handleModalAdd = () => {
    const currentQty = getQuantity();
    if (currentQty === 0) {
      // If not added yet, add with initial localQty
      addActivity(activity); // This adds 1
      if (localQty > 1) {
        updateActivityQuantity(activity.id, localQty - 1);
      }
    } else {
      // If already added, set to localQty
      const delta = localQty - currentQty;
      if (delta !== 0) {
        updateActivityQuantity(activity.id, delta);
      }
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; // Prevent scroll
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Mocking extended details if missing
  const highlights = activity.highlights || [
    'Expert-led guided tour',
    'Skip-the-line access included',
    'Breathtaking photo opportunities',
    'Small group for personal experience'
  ];

  const itinerary = activity.itinerary || [
    { time: '09:00 AM', event: 'Meeting at designated point' },
    { time: '10:30 AM', event: 'Initial briefing and equipment check' },
    { time: '12:00 PM', event: 'Core activity experience' },
    { time: '02:00 PM', event: 'Local lunch and relaxation' },
    { time: '04:00 PM', event: 'Wrap-up and return' }
  ];

  const inclusions = activity.inclusions || [
    'Professional Guide',
    'Safety Equipment',
    'Bottled Water',
    'Local Transportation',
    'Entrance Tickets'
  ];

  const formatINR = (amount: number) => {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content animate-slide-up">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-hero">
          <img src={activity.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200'} alt={activity.name} />
          <div className="modal-hero-overlay">
            <span className="modal-category">{activity.category}</span>
            <h1>{activity.name}</h1>
            <p>📍 {activity.location}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-main-info">
            <section className="modal-section trip-stats">
              <div className="stat-item">
                <span className="stat-icon">⏱</span>
                <div className="stat-text">
                  <label>Duration</label>
                  <span>{activity.duration}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📈</span>
                <div className="stat-text">
                  <label>Difficulty</label>
                  <span>{activity.difficulty || 'Moderate'}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <div className="stat-text">
                  <label>Group Size</label>
                  <span>{activity.groupSize || 'Up to 12'}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⭐</span>
                <div className="stat-text">
                  <label>Rating</label>
                  <span>{activity.rating || '4.8 (120 reviews)'}</span>
                </div>
              </div>
            </section>

            <section className="modal-section">
              <h2>Description</h2>
              <p className="description-text">{activity.description}</p>
            </section>

            <section className="modal-section">
              <h2>Trip Highlights</h2>
              <ul className="highlights-grid">
                {highlights.map((h: string, i: number) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>

            <section className="modal-section">
              <h2>Itinerary</h2>
              <div className="itinerary-list">
                {itinerary.map((item: any, i: number) => (
                  <div key={i} className="itinerary-item">
                    <span className="time">{item.time}</span>
                    <span className="event">{item.event}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="modal-sidebar">
            <div className="inclusion-card">
              <h3>What's Included</h3>
              <ul className="inclusion-list">
                {inclusions.map((item: string, i: number) => (
                  <li key={i} className="included-item">
                    <span className="check-icon">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="booking-card">
              <div className="price-info">
                <label>Price per person</label>
                <span className="modal-price">{formatINR(activity.costPerPerson * 83)}</span>
              </div>
              
              <div className="quantity-selector-container">
                <label>Number of People</label>
                <div className="modal-qty-controls">
                  <button onClick={() => setLocalQty(Math.max(1, localQty - 1))}>-</button>
                  <span className="local-qty">{localQty}</span>
                  <button onClick={() => setLocalQty(localQty + 1)}>+</button>
                </div>
              </div>

              <button 
                className={`modal-add-btn ${getQuantity() > 0 ? 'added' : ''}`}
                onClick={handleModalAdd}
              >
                {getQuantity() > 0 ? `Update in Trip (${getQuantity()})` : 'Add to Trip'}
              </button>
              {getQuantity() > 0 && (
                <p className="booking-note">Total for trip: {formatINR(activity.costPerPerson * 83 * getQuantity())}</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
