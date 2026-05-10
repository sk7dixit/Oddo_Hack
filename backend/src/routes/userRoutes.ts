import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// POST /api/user/profile-photo
router.post('/profile-photo', upload.single('photo'), userController.uploadProfilePhoto);

export default router;
