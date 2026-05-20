export const validateSignin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    next();
};


export const validateOTP = (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
    }
    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        return res.status(400).json({ error: 'Valid 6-digit OTP is required' });
    }

    next();
};


export const validateResendOTP = (req, res, next) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    next();
};


export const validateLogout = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(400).json({ error: 'No token provided' });
    }

    req.token = token;
    next();
};