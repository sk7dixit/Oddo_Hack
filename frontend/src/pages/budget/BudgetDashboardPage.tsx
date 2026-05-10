import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useBudget } from '../../context/BudgetContext';

const BudgetDashboardPage: React.FC = () => {
  const { 
    selectedActivities, 
    hotelCost, 
    transportCost, 
    foodCost, 
    miscCost,
    totalActivityCost,
    totalBudget,
    costPerDay,
    updateActivityQuantity,
    removeActivity
  } = useBudget();

  const formatINR = (amount: number) => {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  };

  const chartData = [
    { name: 'Hotel', value: hotelCost, color: '#4F46E5' },
    { name: 'Transport', value: transportCost, color: '#10B981' },
    { name: 'Food', value: foodCost, color: '#F59E0B' },
    { name: 'Activities', value: totalActivityCost, color: '#EC4899' },
    { name: 'Misc', value: miscCost, color: '#8B5CF6' }
  ].filter(item => item.value > 0); // Only show items with a value > 0

  return (
    <div className="dashboard-page">
      <header className="hero hero-dashboard">
        <h1>Budget Dashboard</h1>
        <p>A comprehensive overview of your trip finances and planning.</p>
      </header>

      <div className="dashboard-grid">
        {/* Section 1: Budget Summary Cards */}
        <div className="dashboard-section summary-cards">
          <div className="stat-card">
            <span>Total Budget</span>
            <h2>{formatINR(totalBudget)}</h2>
          </div>
          <div className="stat-card">
            <span>Cost Per Day</span>
            <h2>{formatINR(costPerDay)}</h2>
          </div>
          <div className="stat-card secondary">
            <span>Activities Selected</span>
            <h2>{selectedActivities.length}</h2>
          </div>
        </div>

        {/* Section 2: Charts */}
        <div className="dashboard-section chart-container">
          <h2>Expense Allocation</h2>
          <div className="chart-wrapper">
            {totalBudget > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                    labelLine={false}
                    label={({ percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatINR(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#1E1B4B' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-chart">
                <p className="empty-text">No data to display in chart.</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Activities */}
        <div className="dashboard-section activities-mini-list">
          <h2>Selected Activities</h2>
          <div className="mini-list">
            {selectedActivities.length > 0 ? (
              selectedActivities.map((act) => (
                <div key={act.id} className="mini-item-dynamic">
                  <div className="item-info">
                    <p className="item-name">{act.name}</p>
                    <p className="item-details">
                      {formatINR(act.costPerPerson)} × {act.quantity} = <strong>{formatINR(act.totalCost)}</strong>
                    </p>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => updateActivityQuantity(act.id, -1)} className="control-btn">-</button>
                    <span className="qty-display">{act.quantity}</span>
                    <button onClick={() => updateActivityQuantity(act.id, 1)} className="control-btn">+</button>
                    <button onClick={() => removeActivity(act.id)} className="remove-btn">🗑</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-text">No activities selected.</p>
            )}
          </div>
        </div>

        {/* Section 4: Expense Breakdown List */}
        <div className="dashboard-section expense-breakdown-list">
          <h2>Detailed Breakdown</h2>
          <div className="mini-list">
            <div className="mini-item">
              <div className="item-dot hotel"></div>
              <p>Accommodation</p>
              <strong>{formatINR(hotelCost)}</strong>
            </div>
            <div className="mini-item">
              <div className="item-dot transport"></div>
              <p>Transportation</p>
              <strong>{formatINR(transportCost)}</strong>
            </div>
            <div className="mini-item">
              <div className="item-dot food"></div>
              <p>Food & Dining</p>
              <strong>{formatINR(foodCost)}</strong>
            </div>
            <div className="mini-item">
              <div className="item-dot activity"></div>
              <p>Activities</p>
              <strong>{formatINR(totalActivityCost)}</strong>
            </div>
            <div className="mini-item">
              <div className="item-dot misc" style={{ backgroundColor: '#8B5CF6' }}></div>
              <p>Miscellaneous</p>
              <strong>{formatINR(miscCost)}</strong>
            </div>
          </div>
        </div>

        {/* Section 5: Bar Chart */}
        <div className="dashboard-section chart-container bar-chart-container" style={{ gridColumn: '1 / -1' }}>
          <h2>Category Comparison</h2>
          <div className="chart-wrapper">
            {totalBudget > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#A78BFA" tick={{ fill: '#A78BFA' }} />
                  <YAxis stroke="#A78BFA" tick={{ fill: '#A78BFA' }} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip 
                    formatter={(value: number) => formatINR(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', background: '#1E1B4B', color: 'white' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-chart">
                <p className="empty-text">No data to display in chart.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboardPage;
