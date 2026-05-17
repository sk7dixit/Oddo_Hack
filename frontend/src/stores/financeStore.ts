import { create } from 'zustand';

interface FinanceState {
  totalBudget: number;
  spent: number;
  currency: string;
  expenses: any[];
  setTotalBudget: (amount: number) => void;
  addExpense: (expense: any) => void;
  setExpenses: (expenses: any[]) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  totalBudget: 250000,
  spent: 120000,
  currency: 'INR',
  expenses: [],
  setTotalBudget: (amount) => set({ totalBudget: amount }),
  addExpense: (expense) => set((state) => ({ 
    expenses: [expense, ...state.expenses],
    spent: state.spent + expense.amount
  })),
  setExpenses: (expenses) => set({ expenses }),
}));
