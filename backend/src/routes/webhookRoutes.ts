import { Router } from 'express';
import express from 'express';
import { clerkWebhook } from '../controllers/webhookController';

const router = Router();

// We need the raw body to verify webhook signatures.
router.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhook);

export default router;
