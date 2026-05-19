import { sendSubscriptionEmails } from '../services/emailService.js';
import { logger } from '../utils/logger.js';

export const subscribe = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Send both emails simultaneously
        await sendSubscriptionEmails(name, email);

        res.json({
            message: 'Subscription successful',
            success: true
        });

    } catch (error) {
        logger.error('Subscription error:', error);
        res.status(500).json({ 
            error: 'Failed to process subscription',
            success: false 
        });
    }
};