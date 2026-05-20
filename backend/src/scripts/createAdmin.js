import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');
        
        const existingAdmin = await User.findOne({ email: 'aniketbawankar2021@gmail.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        const admin = new User({
            email: 'aniketbawankar2021@gmail.com',
            password: 'Aniket@123',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully');
        console.log('Email: aniketbawankar2021@gmail.com');
        console.log('Password: Aniket@123');
        
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

createAdmin();