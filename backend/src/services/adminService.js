import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';
import User from '../models/User.js';
import { sendOTPEmail } from './emailService.js';
import { logger } from '../utils/logger.js';

const r = () => redisClient.isReady ? redisClient : null;


export const adminSigninService = async (email, password) => {
    // Find admin user
    const admin = await User.findOne({ email, role: 'admin' }).select('+password');
    if (!admin) {
        throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Store OTP in Redis (optional — DB backup below is the fallback)
    if (r()) await r().setEx(`otp:${email}`, 600, otp);

    // Backup in database
    admin.otp = {
        code: otp,
        expiresAt: otpExpiry
    };
    await admin.save();

    // Send OTP email
    await sendOTPEmail(email, otp);

    logger.info(`Admin signin initiated for ${email}`);

    return {
        userId: admin._id,
        email: admin.email
    };
};



export const adminVerifyOTPService = async (email, otp) => {
    // Find admin
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
        throw new Error('Invalid credentials');
    }

    let isValidOTP = false;
    let verificationSource = 'unknown';

    // Check Redis first (primary)
    const redisOTP = r() ? await r().get(`otp:${email}`) : null;
    if (redisOTP === otp) {
        isValidOTP = true;
        verificationSource = 'redis';
    } 
    // Fallback to database
    else if (admin.otp && admin.otp.code === otp && admin.otp.expiresAt > new Date()) {
        isValidOTP = true;
        verificationSource = 'database';
    }

    if (!isValidOTP) {
        throw new Error('Invalid or expired OTP');
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Cleanup OTP from both Redis and database
    if (r()) await r().del(`otp:${email}`);
    admin.otp = undefined;
    await admin.save();

    logger.info(`Admin OTP verified for ${email} via ${verificationSource}`);

    return {
        token,
        user: {
            id: admin._id,
            email: admin.email,
            role: admin.role
        }
    };
};



export const adminResendOTPService = async (email) => {
    // Rate limiting check (3 requests per hour per email)
    const rateLimitKey = `resend_otp:${email}`;
    const currentCount = r() ? await r().get(rateLimitKey) : null;

    if (currentCount && parseInt(currentCount) >= 3) {
        const ttl = r() ? await r().ttl(rateLimitKey) : 3600;
        throw new Error(`Too many OTP requests. Retry after ${ttl} seconds`);
    }

    // Find admin
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
        throw new Error('Invalid credentials');
    }

    // Generate new OTP
    const newOTP = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update rate limit counter
    if (r()) {
        const pipeline = r().multi();
        if (currentCount) {
            pipeline.incr(rateLimitKey);
        } else {
            pipeline.setEx(rateLimitKey, 3600, '1');
        }
        await pipeline.exec();
    }

    // Store new OTP in both places
    if (r()) await r().setEx(`otp:${email}`, 600, newOTP);
    
    admin.otp = {
        code: newOTP,
        expiresAt: otpExpiry
    };
    await admin.save();

    // Send new OTP
    await sendOTPEmail(email, newOTP);

    logger.info(`Admin OTP resent for ${email}`);

    return { message: 'New OTP sent to your email' };
};



export const adminLogoutService = async (token, user) => {
    // Log user activity
    logger.info(`Admin logout: ${user.email}`);

    // Blacklist token and remove session in Redis
    if (r()) {
        const pipeline = r().multi();
        pipeline.setEx(`blacklist:${token}`, 86400, 'true');
        pipeline.del(`session:${user._id}`);
        await pipeline.exec();
    }

    return { message: 'Logout successful' };
};