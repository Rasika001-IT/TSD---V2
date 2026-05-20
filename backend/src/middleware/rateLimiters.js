import rateLimit from 'express-rate-limit';
import redisClient from '../config/redis.js';

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per IP
    message: 'Too many login attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
});

export const otpRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // 3 OTP requests per IP
    message: 'Too many OTP requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
});

export const generalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per IP
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
});


export const subscriptionRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 subscription requests per IP
    message: 'Too many subscription attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
});