import express from 'express';
import { authRateLimit, otpRateLimit, generalRateLimit } from '../middleware/rateLimiters.js';
import { protect } from '../middleware/auth.js';
import { validateSignin, validateOTP, validateResendOTP, validateLogout } from '../middleware/adminValidation.js';
import {
  adminSignin,
  adminVerifyOTP,
  adminResendOTP,
  adminLogout
} from '../controllers/adminController.js';

const router = express.Router();

// POST /admin/signin - Admin Signin API
router.post('/signin', authRateLimit, validateSignin, adminSignin);

// POST /admin/signin/verify-otp - OTP Verification API
router.post('/signin/verify-otp', otpRateLimit, validateOTP, adminVerifyOTP);

// POST /admin/signin/resend-otp - Resend OTP API
router.post('/signin/resend-otp', otpRateLimit, validateResendOTP, adminResendOTP);

// POST /admin/logout - Logout API
router.post('/logout', generalRateLimit, protect, validateLogout, adminLogout);

export default router;