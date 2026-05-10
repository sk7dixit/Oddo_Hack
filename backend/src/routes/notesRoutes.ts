import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notesController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/:tripId', getNotes);
router.post('/:tripId', createNote);
router.put('/:tripId/notes/:noteId', updateNote);
router.delete('/:tripId/notes/:noteId', deleteNote);

export default router;
