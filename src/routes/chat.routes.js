import { Router } from 'express';
import { handleChatMessage } from '../controllers/chat.controller.js';
import { chatRateLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

/**
 * POST /api/chat
 * 
 * Middleware applied:
 * 1. chatRateLimiter: Limits abuse (20 requests / 15 min per IP)
 * 2. handleChatMessage: Input validation + OpenAI response handler
 */
router.post('/', chatRateLimiter, handleChatMessage);

export default router;
