import React, { useState } from 'react';
import { getBudgetSummary } from '../../services/budgetService';

const ExpenseBreakdownPage: React.FC = () => {
  const [tripId, setTripId] = useState('test_trip_id');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getBudgetSummary(tripId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (amount: number) => {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  };

  return (
    <div className="breakdown-page">
      <header className="hero hero-breakdown">
        <h1>Expense Breakdown</h1>
        <p>Review your saved trip budgets and detailed expense lists.</p>
      </header>

      <div className="search-section">
        <div className="search-card">
          <input 
            type="text" 
            placeholder="Enter Trip ID (e.g. test_trip_id)" 
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
            className="search-input"
          />
          <button onClick={handleFetch} className="search-btn" disabled={loading}>
            {loading ? 'Fetching...' : 'View Breakdown'}
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
      </div>

      {data && (
        <div className="breakdown-results">
          <div className="summary-section">
            <h2>Budget Summary</h2>
            <div className="summary-grid">
              <div className="summary-stat">
                <span>Total Budget</span>
                <h3>{formatINR(data.budgetSummary.totalBudget)}</h3>
              </div>
              <div className="summary-stat">
                <span>Cost Per Day</span>
                <h3>{formatINR(data.budgetSummary.costPerDay)}</h3>
              </div>
              <div className="summary-stat">
                <span>Created At</span>
                <h3>{new Date(data.budgetSummary.createdAt).toLocaleDateString()}</h3>
              </div>
            </div>
          </div>

          <div className="lists-section">
            <div className="list-card">
              <h2>Recent Expenses</h2>
              {data.expenses.length > 0 ? (
                <div className="expense-list">
                  {data.expenses.map((exp: any) => (
                    <div key={exp.id} className="list-item">
                      <div className="item-info">
                        <strong>{exp.title}</strong>
                        <span>{exp.category}</span>
                      </div>
                      <div className="item-amount">
                        {formatINR(exp.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-text">No specific expenses logged yet.</p>
              )}
            </div>

            <div className="list-card">
              <h2>Selected Activities</h2>
              {data.selectedActivities.length > 0 ? (
                <div className="activity-list">
                  {data.selectedActivities.map((act: any) => (
                    <div key={act.id} className="list-item activity-item">
                      <div className="item-info">
                        <strong>{act.title}</strong>
                        <span>{act.date ? new Date(act.date).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="item-amount">
                        {formatINR(act.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-text">No activities selected for this trip.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseBreakdownPage;
