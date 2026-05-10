import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile);

export default router;
