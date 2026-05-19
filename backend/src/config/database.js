import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error('Database connection failed:', error.message);
    throw error;
  }
};