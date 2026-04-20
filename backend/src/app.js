import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { connectRedis } from './config/redis.js';
import refreshService from './services/refreshService.js';
import { logger } from './utils/logger.js';
import postsRouter from './routes/posts.js';
import categoriesRouter from './routes/categories.js';
import tagsRouter from './routes/tags.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
];

const corsOptions = {
    origin: (origin, callback) => {
        
        if (!origin) {
            callback(null, true);
            return;
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            logger.warn(`CORS blocked request from: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400, // 24 hours
};

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP',
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(limiter);
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tags', tagsRouter);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export const startServer = async () => {
    try {
        const redisClient = await connectRedis();
        if (!redisClient) {
            console.warn('Redis not available - running without caching');
        }
        
        // Only start refresh service if Redis is available
        if (redisClient) {
            await refreshService.initialWarmup();
            refreshService.startBackgroundRefresh();
        }
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
        logger.info(`🚀 Server running on port ${PORT}`);
        logger.info(`📡 Health check: http://localhost:${PORT}/health`);
        logger.info(`🔒 CORS allowed origins: ${allowedOrigins.join(', ')}`);
        logger.info(redisClient ? '🗄️  Redis caching enabled' : '⚠️  Redis caching disabled');
        });
    } catch (error) {
        logger.error('Failed to start server', error.message);
        process.exit(1);
    }
};

export default app;