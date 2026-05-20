import express from 'express';
import { subscriptionRateLimit } from '../middleware/rateLimiters.js';
import { validateSubscription } from '../middleware/subscriptionValidation.js';
import { subscribe } from '../controllers/subscriptionController.js';

const router = express.Router();

// POST /api/subscribe - Subscription API
router.post('/subscribe', subscriptionRateLimit, validateSubscription, subscribe);

export default router;