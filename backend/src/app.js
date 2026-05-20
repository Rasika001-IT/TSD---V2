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

// CORS Configuration
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : [];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser requests (Postman, curl)
        if (!origin) return callback(null, true);

        // If no env set → allow all (prevents Railway blocking)
        if (allowedOrigins.length === 0) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            logger.warn(`CORS blocked request from: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
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
        // Database connection 
        try {
            await connectDatabase();
            logger.info('MongoDB connected');
        } catch (err) {
            logger.error('Database connection failed:', err.message);
            process.exit(1);
        }

        // Redis should not crash app if unavailable
        try {
            await connectRedis();
            logger.info('Redis connected');
        } catch (err) {
            logger.warn('Redis connection failed, continuing without it');
        }

        // Background jobs s
        try {
            await refreshService.initialWarmup();
            refreshService.startBackgroundRefresh();
        } catch (err) {
            logger.warn('Background service failed to start');
        }

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, '0.0.0.0', () => {
            logger.info(`Server running on port ${PORT}`);
            logger.info(`Live URL: https://<your-domain>`);
            logger.info(`Health: /health`);
            logger.info(`Admin APIs: /api/admin/*`);
        });

    } catch (error) {
        logger.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

export default app;