import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



export const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Admin Login OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Admin Login OTP</h2>
                <p>Your OTP for admin login is:</p>
                <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold; letter-spacing: 3px;">${otp}</span>
                </div>
                <p>This OTP will expire in 10 minutes.</p>
                <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`OTP email sent to ${email}`);
    } catch (error) {
        logger.error('Failed to send OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};



export const sendSubscriptionThankYouEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Thank you for subscribing to The Success Digest',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">Thank You for Subscribing!</h2>
                <p>Dear ${name},</p>
                <p>Thank you for subscribing to <strong>The Success Digest</strong>.</p>
                <p>We're excited to have you on board and look forward to sharing valuable content with you.</p>
                <p style="color: #666; font-size: 12px;">If you didn't subscribe to The Success Digest, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Subscription thank you email sent to ${email}`);
    } catch (error) {
        logger.error('Failed to send subscription thank you email:', error);
        throw new Error('Failed to send subscription thank you email');
    }
};



export const sendSubscriptionNotificationEmail = async (name, email) => {
    try {
        const tsdEmails = [
            'thesucessdigest@gmail.com',
            'thesuccessdigest@gmail.com',
            'olivia@thesuccessdigest.com'
        ];

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: tsdEmails.join(','),
            subject: 'New User Subscription',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">New User Subscription Details</h2>
                <p>A new user has subscribed to The Success Digest:</p>
                <div style="background: #f4f4f4; padding: 20px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subscribed on:</strong> ${new Date().toLocaleString()}</p>
                </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Subscription notification email sent to TSD team for ${email}`);
    } catch (error) {
        logger.error('Failed to send subscription notification email:', error);
        throw new Error('Failed to send subscription notification email');
    }
};



export const sendSubscriptionEmails = async (name, email) => {
    try {
        // Send both emails simultaneously using Promise.all
        await Promise.all([
            sendSubscriptionThankYouEmail(email, name),
            sendSubscriptionNotificationEmail(name, email)
        ]);
        logger.info(`Both subscription emails sent successfully for ${email}`);
    } catch (error) {
        logger.error('Failed to send subscription emails:', error);
        throw new Error('Failed to send subscription emails');
    }
};