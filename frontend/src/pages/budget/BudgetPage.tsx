import React, { useState, useEffect } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { calculateBudget } from '../../services/budgetService';

const BudgetPage: React.FC = () => {
  const { 
    hotelCost: ctxHotel, 
    transportCost: ctxTransport, 
    foodCost: ctxFood, 
    miscCost: ctxMisc,
    tripDays: ctxDays, 
    selectedActivities,
    updateBudgetFields,
    totalBudget,
    costPerDay,
    totalActivityCost
  } = useBudget();

  // Local state for the form inputs
  const [formData, setFormData] = useState({
    hotelCost: ctxHotel,
    transportCost: ctxTransport,
    foodCost: ctxFood,
    miscCost: ctxMisc,
    tripDays: ctxDays
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // Sync local state with context initially
  useEffect(() => {
    setFormData({
      hotelCost: ctxHotel,
      transportCost: ctxTransport,
      foodCost: ctxFood,
      miscCost: ctxMisc,
      tripDays: ctxDays
    });
  }, [ctxHotel, ctxTransport, ctxFood, ctxMisc, ctxDays]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
    setIsCalculated(false);
    setError(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Sync to context first for local reactivity
      updateBudgetFields(formData);

      // Call Backend API
      const result = await calculateBudget({
        ...formData,
        activities: selectedActivities // Backend needs full objects to persist them
      });

      if (result) {
        setIsCalculated(true);
      } else {
        setError('Failed to sync with server. Using local calculations.');
        setIsCalculated(true);
      }
    } catch (err) {
      setError('An error occurred during calculation.');
      setIsCalculated(true);
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (amount: number) => {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  };

  return (
    <div className="budget-page">
      <header className="hero hero-budget">
        <h1>Trip Budget Calculator</h1>
        <p>Plan your expenses and stay on top of your travel finances.</p>
      </header>

      <div className="budget-container">
        <div className="budget-form-card">
          <h2>Estimate Costs (in INR ₹)</h2>
          <div className="budget-form">
            <div className="input-group">
              <label>Hotel Cost (₹)</label>
              <input type="number" name="hotelCost" min="0" value={formData.hotelCost} onChange={handleInputChange} required />
            </div>
            
            <div className="input-group">
              <label>Transport Cost (₹)</label>
              <input type="number" name="transportCost" min="0" value={formData.transportCost} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <label>Food Cost (₹)</label>
              <input type="number" name="foodCost" min="0" value={formData.foodCost} onChange={handleInputChange} required />
            </div>

            <div className="input-group disabled">
              <label>Total Activity Cost (₹) - [Add in Search]</label>
              <input type="number" name="totalActivityCost" value={totalActivityCost} readOnly />
            </div>

            <div className="input-group">
              <label>Misc Cost (₹)</label>
              <input type="number" name="miscCost" min="0" value={formData.miscCost} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Number of Days</label>
              <input type="number" name="tripDays" min="1" value={formData.tripDays} onChange={handleInputChange} required />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button 
              className={`calculate-btn ${loading ? 'loading' : ''}`} 
              onClick={handleCalculate}
              disabled={loading}
            >
              {loading ? 'Calculating...' : 'Calculate Budget'}
            </button>
          </div>
        </div>

        <div className="budget-results-card">
          <h2>{isCalculated ? 'Budget Breakdown' : 'Estimated Breakdown'}</h2>
          
          <div className="result-highlight">
            <div className="total-box">
              <span>Grand Total</span>
              <h3>{formatINR(totalBudget)}</h3>
            </div>
            <div className="total-box">
              <span>Cost Per Day</span>
              <h3>{formatINR(costPerDay)}</h3>
            </div>
          </div>

          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>🏨 Accommodation</span>
              <strong>{formatINR(ctxHotel)}</strong>
            </div>
            <div className="breakdown-item">
              <span>✈️ Transportation</span>
              <strong>{formatINR(ctxTransport)}</strong>
            </div>
            <div className="breakdown-item">
              <span>🍔 Food & Dining</span>
              <strong>{formatINR(ctxFood)}</strong>
            </div>
            <div className="breakdown-item">
              <span>🏄 Activities</span>
              <strong>{formatINR(totalActivityCost)}</strong>
            </div>
            <div className="breakdown-item">
              <span>🛍️ Miscellaneous</span>
              <strong>{formatINR(ctxMisc)}</strong>
            </div>
          </div>
          {!isCalculated && !loading && (
            <p className="calc-hint">Click "Calculate Budget" to finalize these estimates.</p>
          )}
          {loading && (
            <div className="loading-results">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
