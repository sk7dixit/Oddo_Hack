import { Router } from 'express';
import { login, signup, logout, getProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);

export default router;
