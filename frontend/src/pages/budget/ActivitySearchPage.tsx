import React, { useEffect, useState } from 'react';
import { fetchActivities } from '@/services/budgetService';

import { useBudget } from '../../context/BudgetContext';
import ActivityDetailsModal from '../../components/budget/ActivityDetailsModal';

interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  costPerPerson: number;
  duration: string;
  imageUrl: string;
  // Extended fields for details
  difficulty?: string;
  groupSize?: string;
  rating?: string;
  highlights?: string[];
  itinerary?: any[];
  inclusions?: string[];
}

const ActivitySearchPage: React.FC = () => {
  const { addActivity, selectedActivities } = useBudget();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    loadActivities();
  }, [categoryFilter, locationFilter, searchName]);

  const loadActivities = async () => {
    setLoading(true);
    const data = await fetchActivities(categoryFilter, locationFilter, searchName);
    setActivities(data);
    setLoading(false);
  };

  const handleAddToTrip = (e: React.MouseEvent, activity: Activity) => {
    e.stopPropagation(); // Prevent opening details when clicking the button
    addActivity(activity);
  };

  const getActivityQuantity = (id: string) => {
    const act = selectedActivities.find(a => a.id === id);
    return act ? act.quantity : 0;
  };

  return (
    <div className="activity-page">
      <header className="hero">
        <h1>Discover Amazing Activities</h1>
        <p>Find the perfect adventures to add to your next trip itinerary.</p>
      </header>

      <div className="filters-container">
        <div className="filter-group">
          <label>Search Activity</label>
          <input 
            type="text" 
            placeholder="e.g. Trekking, Scuba..." 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Category</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-input"
          >
            <option value="">All Categories</option>
            <option value="Trekking">Trekking</option>
            <option value="Camping">Camping</option>
            <option value="Scuba Diving">Scuba Diving</option>
            <option value="Safari">Safari</option>
            <option value="Museum Visit">Museum Visit</option>
            <option value="Sightseeing">Sightseeing</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Location</label>
          <input 
            type="text" 
            placeholder="e.g. Paris, France" 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading activities...</div>
      ) : (
        <div className="activities-grid">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div 
                className="activity-card interactive" 
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="card-image" style={{ backgroundImage: `url(${activity.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600'})` }}>
                  <span className="category-badge">{activity.category}</span>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <h2>{activity.name}</h2>
                    <span className="price">₹{Math.round(activity.costPerPerson * 83).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="location">📍 {activity.location}</p>
                  <p className="description">{activity.description}</p>
                  <div className="card-footer">
                    <span className="duration">⏱ {activity.duration}</span>
                    <button 
                      className={`add-btn ${getActivityQuantity(activity.id) > 0 ? 'added' : ''}`} 
                      onClick={(e) => handleAddToTrip(e, activity)}
                    >
                      {getActivityQuantity(activity.id) > 0 
                        ? `Added (${getActivityQuantity(activity.id)})` 
                        : 'Add to Trip'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No activities found matching your criteria.</div>
          )}
        </div>
      )}

      {selectedActivity && (
        <ActivityDetailsModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}
    </div>
  );
};

export default ActivitySearchPage;
