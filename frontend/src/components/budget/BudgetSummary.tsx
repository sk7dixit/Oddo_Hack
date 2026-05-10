import React from 'react';

interface BudgetSummaryProps {
  total: number;
  spent: number;
  remaining: number;
  currency?: string;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ total, spent, remaining, currency = 'INR' }) => {
  return (
    <div className="budget-summary">
      <p>Total: {currency} {total.toLocaleString()}</p>
      <p>Spent: {currency} {spent.toLocaleString()}</p>
      <p>Remaining: {currency} {remaining.toLocaleString()}</p>
    </div>
  );
};

export default BudgetSummary;
