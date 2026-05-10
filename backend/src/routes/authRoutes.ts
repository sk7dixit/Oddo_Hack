import { Router } from 'express';
import { syncUser } from '../controllers/authController';
import { requireAuth } from '@clerk/express';

const router = Router();

// Protect the route so only authenticated users can access it
router.post('/sync-user', requireAuth(), syncUser);

export default router;
