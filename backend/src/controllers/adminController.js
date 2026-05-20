import { adminSigninService, adminVerifyOTPService, adminResendOTPService, adminLogoutService } from '../services/adminService.js';
import { logger } from '../utils/logger.js';


export const adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await adminSigninService(email, password);

        res.json({
            message: 'OTP sent to your email',
            userId: result.userId,
            email: result.email
        });

    } catch (error) {
        logger.error('Admin signin error:', error);
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const adminVerifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = await adminVerifyOTPService(email, otp);

        res.json({
            message: 'Login successful',
            token: result.token,
            user: result.user
        });

    } catch (error) {
        logger.error('Admin OTP verification error:', error);
        if (error.message === 'Invalid credentials' || error.message === 'Invalid or expired OTP') {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const adminResendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await adminResendOTPService(email);

        res.json(result);

    } catch (error) {
        logger.error('Admin OTP resend error:', error);
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message });
        }
        if (error.message.includes('Too many OTP requests')) {
            return res.status(429).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const adminLogout = async (req, res) => {
    try {
        const result = await adminLogoutService(req.token, req.user);

        res.json(result);

    } catch (error) {
        logger.error('Admin logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};