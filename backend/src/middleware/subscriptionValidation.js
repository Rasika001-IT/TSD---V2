export const validateSubscription = (req, res, next) => {
    const { name, email } = req.body;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: 'Valid name is required (minimum 2 characters)' });
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    next();
};