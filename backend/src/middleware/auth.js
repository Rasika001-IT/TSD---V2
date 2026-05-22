import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        // Check if token is blacklisted (skip if Redis not ready)
        const isBlacklisted = redisClient.isReady ? await redisClient.get(`blacklist:${token}`) : null;
        if (isBlacklisted) {
            return res.status(401).json({ error: 'Token has been revoked' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user || user.role !== 'admin') {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};