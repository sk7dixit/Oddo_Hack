import React, { useState } from 'react';
import ActivitySearchPage from './pages/budget/ActivitySearchPage';
import BudgetPage from './pages/budget/BudgetPage';
import BudgetDashboardPage from './pages/budget/BudgetDashboardPage';
import { BudgetProvider } from './context/BudgetContext';
import './index.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState<'activities' | 'budget' | 'dashboard'>('dashboard');

  return (
    <BudgetProvider>
      <div className="app-container">
      <nav className="navbar">
        <div className="logo">TRAVELOOP</div>
        <div className="nav-links">
          <button 
            className={`nav-btn ${currentPage === 'budget' ? 'active' : ''}`}
            onClick={() => setCurrentPage('budget')}
          >
            Budget Calculator
          </button>
          <button 
            className={`nav-btn ${currentPage === 'activities' ? 'active' : ''}`}
            onClick={() => setCurrentPage('activities')}
          >
            Activity Search
          </button>
          <button 
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Budget Dashboard
          </button>
        </div>
      </nav>
      
      {currentPage === 'budget' && <BudgetPage />}
      {currentPage === 'activities' && <ActivitySearchPage />}
      {currentPage === 'dashboard' && <BudgetDashboardPage />}
    </div>
    </BudgetProvider>
  );
};

export default App;
