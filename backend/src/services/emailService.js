import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.log('SMTP VERIFY ERROR:', error);

        logger.error('SMTP connection failed:', error);
    } else {
        console.log('SMTP SERVER READY');

        logger.info('SMTP server is ready');
    }
});



export const sendOTPEmail = async (email, otp) => {
    try {

        console.log('Sending OTP email to:', email);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Admin Login OTP',

            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Admin Login OTP</h2>

                    <p>Your OTP for admin login is:</p>

                    <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                        <span style="font-size: 24px; font-weight: bold; letter-spacing: 3px;">
                            ${otp}
                        </span>
                    </div>

                    <p>This OTP will expire in 10 minutes.</p>

                    <p style="color: #666; font-size: 12px;">
                        If you didn't request this, please ignore this email.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('================ OTP EMAIL ================');
        console.log('Sent To:', email);
        console.log('Accepted:', info.accepted);
        console.log('Rejected:', info.rejected);
        console.log('Pending:', info.pending);
        console.log('Response:', info.response);
        console.log('Message ID:', info.messageId);
        console.log('===========================================');

        logger.info(`OTP email sent to ${email}`);

    } catch (error) {

        console.log('OTP EMAIL ERROR FULL:', error);

        logger.error('Failed to send OTP email:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT
        });

        throw new Error('Failed to send OTP email');
    }
};



export const sendSubscriptionThankYouEmail = async (email, name) => {
    try {

        console.log('Sending subscription thank you email to:', email);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Thank you for subscribing to The Success Digest',

            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">

                    <h2 style="color: #333;">Thank You for Subscribing!</h2>

                    <p>Dear ${name},</p>

                    <p>
                        Thank you for subscribing to 
                        <strong>The Success Digest</strong>.
                    </p>

                    <p>
                        We're excited to have you on board and look forward 
                        to sharing valuable content with you.
                    </p>

                    <p style="color: #666; font-size: 12px;">
                        If you didn't subscribe to The Success Digest, 
                        please ignore this email.
                    </p>

                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('========= SUBSCRIPTION THANK YOU =========');
        console.log('Sent To:', email);
        console.log('Accepted:', info.accepted);
        console.log('Rejected:', info.rejected);
        console.log('Pending:', info.pending);
        console.log('Response:', info.response);
        console.log('Message ID:', info.messageId);
        console.log('==========================================');

        logger.info(`Subscription thank you email sent to ${email}`);

    } catch (error) {

        console.log('THANK YOU EMAIL ERROR FULL:', error);

        logger.error('Failed to send subscription thank you email:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT
        });

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

        console.log('Sending subscription notification email...');
        console.log('Recipients:', tsdEmails);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: tsdEmails,

            subject: 'New User Subscription',

            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">

                    <h2 style="color: #333;">
                        New User Subscription Details
                    </h2>

                    <p>
                        A new user has subscribed to The Success Digest:
                    </p>

                    <div style="background: #f4f4f4; padding: 20px; margin: 20px 0;">

                        <p><strong>Name:</strong> ${name}</p>

                        <p><strong>Email:</strong> ${email}</p>

                        <p>
                            <strong>Subscribed on:</strong> 
                            ${new Date().toLocaleString()}
                        </p>

                    </div>

                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('====== SUBSCRIPTION NOTIFICATION =========');
        console.log('Recipients:', tsdEmails);
        console.log('Accepted:', info.accepted);
        console.log('Rejected:', info.rejected);
        console.log('Pending:', info.pending);
        console.log('Response:', info.response);
        console.log('Message ID:', info.messageId);
        console.log('==========================================');

        logger.info(`Subscription notification email sent for ${email}`);

    } catch (error) {

        console.log('NOTIFICATION EMAIL ERROR FULL:', error);

        logger.error('Failed to send subscription notification email:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT
        });

        throw error;
    }
};



export const sendSubscriptionEmails = async (name, email) => {
    try {

        console.log('==========================================');
        console.log('STARTING SUBSCRIPTION EMAIL PROCESS');
        console.log('User Name:', name);
        console.log('User Email:', email);
        console.log('==========================================');

        await Promise.all([
            sendSubscriptionThankYouEmail(email, name),
            sendSubscriptionNotificationEmail(name, email)
        ]);

        console.log('==========================================');
        console.log('ALL SUBSCRIPTION EMAILS SENT SUCCESSFULLY');
        console.log('==========================================');

        logger.info(`Both subscription emails sent successfully for ${email}`);

    } catch (error) {

        console.log('SUBSCRIPTION EMAIL PROCESS ERROR:', error);

        logger.error('Failed to send subscription emails:', error);

        throw new Error('Failed to send subscription emails');
    }
};