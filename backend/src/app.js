import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { connectRedis } from './config/redis.js';
import { connectDatabase } from './config/database.js';
import refreshService from './services/refreshService.js';
import { logger } from './utils/logger.js';
import postsRouter from './routes/posts.js';
import categoriesRouter from './routes/categories.js';
import tagsRouter from './routes/tags.js';
import adminRouter from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';
import subscriptionRouter from './routes/subscription.js';


const app = express();
app.set('trust proxy', 1);

// CORS Configuration
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow Postman, curl, Hoppscotch desktop
    if (!origin) {
      return callback(null, true);
    }

    // Allow frontend URLs
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Block other origins
    return callback(null, false);
  },

  credentials: true,
};

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
});

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(limiter);
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/admin', adminRouter);
app.use('/api', subscriptionRouter);

// Error Handler
app.use(errorHandler);

// Start Server
export const startServer = async () => {
    try {
        // 1. Connect to MongoDB first (required — exit if it fails)
        try {
            await connectDatabase();
            logger.info('MongoDB connected');
        } catch (err) {
            logger.error('Database connection failed:', err.message);
            process.exit(1);
        }

        // 2. Start listening immediately so Railway health check passes
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, '0.0.0.0', () => {
            logger.info(`Server running on port ${PORT}`);
            logger.info(`Health: /health`);
            logger.info(`Admin APIs: /api/admin/*`);
        });

        // 3. Redis and cache warmup run in background — do NOT block server start
        connectRedis()
            .then(() => logger.info('Redis connected'))
            .catch(() => logger.warn('Redis connection failed, continuing without it'));

        refreshService.initialWarmup()
            .then(() => refreshService.startBackgroundRefresh())
            .catch(() => logger.warn('Background service failed to start'));

    } catch (error) {
        logger.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

export default app;