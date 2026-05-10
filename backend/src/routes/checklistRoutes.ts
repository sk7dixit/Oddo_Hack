import { Router } from 'express';
import { getChecklist, addChecklistItem, toggleChecklistItem, deleteChecklistItem } from '../controllers/checklistController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/:tripId', getChecklist);
router.post('/:tripId', addChecklistItem);
router.patch('/:tripId/items/:itemId/toggle', toggleChecklistItem);
router.delete('/:tripId/items/:itemId', deleteChecklistItem);

export default router;
