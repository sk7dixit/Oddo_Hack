import { Router } from 'express';
import { getActivities, calculateBudget, getBudgetSummary, createExpense } from '../controllers/budgetController';

const router = Router();

// Activity Routes (Grouped under Budget module as per frontend design)
router.get('/activities', getActivities);

// Budget & Expense Routes
router.post('/budget/calculate', calculateBudget);
router.get('/budget', getBudgetSummary);
router.post('/expenses', createExpense);

export default router;
