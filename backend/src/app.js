// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import rateLimit from 'express-rate-limit';
// import { connectRedis } from './config/redis.js';
// import refreshService from './services/refreshService.js';
// import { logger } from './utils/logger.js';
// import postsRouter from './routes/posts.js';
// import categoriesRouter from './routes/categories.js';
// import tagsRouter from './routes/tags.js';
// import { errorHandler } from './middleware/errorHandler.js';

// const app = express();

// const allowedOrigins = [
//     process.env.FRONTEND_URL,
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
        
//         if (!origin) {
//             callback(null, true);
//             return;
//         }

//         if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             logger.warn(`CORS blocked request from: ${origin}`);
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     maxAge: 86400, // 24 hours
// };

// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000,
//     max: 100,
//     message: 'Too many requests from this IP',
// });

// app.use(helmet());
// app.use(cors(corsOptions));
// app.use(compression());
// app.use(limiter);
// app.use(express.json());

// app.use('/api/posts', postsRouter);
// app.use('/api/categories', categoriesRouter);
// app.use('/api/tags', tagsRouter);

// app.get('/health', (req, res) => {
//     res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// app.use(errorHandler);

// export const startServer = async () => {
//     try {
//         await connectRedis();
//         await refreshService.initialWarmup();
//         refreshService.startBackgroundRefresh();
        
//         const PORT = process.env.PORT || 3000;
//         app.listen(PORT, () => {
//         logger.info(`🚀 Server running on port ${PORT}`);
//         logger.info(`📡 Health check: http://localhost:${PORT}/health`);
//         logger.info(`🔒 CORS allowed origins: ${allowedOrigins.join(', ')}`);
//         });
//     } catch (error) {
//         logger.error('Failed to start server', error.message);
//         process.exit(1);
//     }
// };

// export default app;





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

/**
 * ✅ CORS CONFIG (safe fallback)
 */
const allowedOrigins = [
    process.env.FRONTEND_URL,
].filter(Boolean); // removes undefined

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

/**
 * ✅ MIDDLEWARES
 */
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(limiter);
app.use(express.json());

/**
 * ✅ ROUTES
 */
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tags', tagsRouter);

/**
 * ✅ ERROR HANDLER
 */
app.use(errorHandler);

/**
 * ✅ START SERVER
 */
export const startServer = async () => {
    try {
        // Redis should not crash app if unavailable
        try {
            await connectRedis();
            logger.info('✅ Redis connected');
        } catch (err) {
            logger.warn('⚠️ Redis connection failed, continuing without it');
        }

        // Background jobs (safe execution)
        try {
            await refreshService.initialWarmup();
            refreshService.startBackgroundRefresh();
        } catch (err) {
            logger.warn('⚠️ Background service failed to start');
        }

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, '0.0.0.0', () => {
            logger.info(`🚀 Server running on port ${PORT}`);
            logger.info(`🌍 Live URL: https://<your-domain>`);
            logger.info(`📡 Health: /health`);
        });

    } catch (error) {
        logger.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

export default app;
