import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware.js';
import chatRoutes from './routes/chat.routes.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ─────────────────────────────────────────────
// 1. CORS (Cross-Origin Resource Sharing)
// ─────────────────────────────────────────────
// Allows our React frontend (running on port 5173) to communicate with
// our Express backend (running on port 5000) securely.
const cleanFrontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
const allowedOrigins = [
  cleanFrontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, '');
      const isAllowed =
        cleanFrontendUrl === '*' ||
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app') ||
        cleanOrigin.includes('localhost');

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy blocked access from origin: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─────────────────────────────────────────────
// 2. Request Parsers
// ─────────────────────────────────────────────
// Parse JSON payloads with a safety limit (10kb) to prevent large body attacks
app.use(express.json({ limit: '10kb' }));

// ─────────────────────────────────────────────
// 3. Health Check Route
// ─────────────────────────────────────────────
// Essential for deployment (Render, AWS, Railway) and testing connectivity
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    message: 'Portfolio Chatbot Backend API is up and running!',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ─────────────────────────────────────────────
// 4. Chatbot AI API Route
// ─────────────────────────────────────────────
app.use('/api/chat', chatRoutes);

// ─────────────────────────────────────────────
// 5. 404 Handler for Unmatched Routes
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─────────────────────────────────────────────
// 5. Central Error Handling Middleware (must be last)
// ─────────────────────────────────────────────
app.use(errorHandler);

// ─────────────────────────────────────────────
// 6. Server Initialization
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on: http://localhost:${PORT}`);
  console.log(`🩺 Health check at: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Allowed frontend origin: ${FRONTEND_URL}\n`);
});
