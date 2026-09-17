import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware
 * 
 * Why is this needed?
 * A portfolio chatbot is exposed to the public internet.
 * Without rate limiting, a single bot or user could send 100s of requests per minute,
 * draining your OpenAI API credits or causing a Denial of Service (DoS).
 * 
 * Config:
 * - windowMs: 15 minutes window
 * - max: 20 requests per window per IP
 */
export const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 chat requests per 15 minutes
  standardHeaders: true, // Return standard rate limit headers (RateLimit-*)
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    success: false,
    error: 'Too many messages sent. Please wait a few minutes before trying again.',
  },
});
