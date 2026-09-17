/**
 * Centralized Error Handling Middleware
 * 
 * Why is this needed?
 * 1. Prevents server crashes on unhandled errors.
 * 2. Hides internal stack traces from clients in production (security best practice).
 * 3. Provides clean, consistent JSON error responses: { success: false, error: "..." }.
 */
export const errorHandler = (err, req, res, next) => {
  // Log full error details on the server for debugging
  console.error('[Error Details]:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    timestamp: new Date().toISOString(),
  });

  const statusCode = err.statusCode || 500;
  const clientMessage =
    statusCode === 500
      ? 'An unexpected error occurred. Please try again later.'
      : err.message;

  res.status(statusCode).json({
    success: false,
    error: clientMessage,
  });
};
