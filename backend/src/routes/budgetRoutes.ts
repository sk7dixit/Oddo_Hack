import { Router } from 'express';
import { getBudget, addExpense, searchActivities } from '../controllers/budgetController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/activities', searchActivities);
router.get('/:tripId', getBudget);
router.post('/:tripId/expenses', addExpense);

export default router;
