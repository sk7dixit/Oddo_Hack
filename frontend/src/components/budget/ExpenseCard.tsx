import React from 'react';

interface ExpenseCardProps {
  category: string;
  amount: number;
  currency?: string;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ category, amount, currency = 'INR' }) => {
  return (
    <div className="expense-card">
      <h4>{category}</h4>
      <p>{currency} {amount.toLocaleString()}</p>
    </div>
  );
};

export default ExpenseCard;
