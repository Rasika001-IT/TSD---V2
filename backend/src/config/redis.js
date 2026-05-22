import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config()

const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = Number(process.env.REDIS_PORT) || 6379;
const redisPassword = process.env.REDIS_PASSWORD || undefined;

const redisClient = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
    connectTimeout: 5000,
    reconnectStrategy: (retries) => {
      if (retries >= 3) return new Error('Max Redis retries reached');
      return 2000; // wait 2s between retries
    },
  },
  password: redisPassword,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log(`Redis connected successfully on ${redisHost}:${redisPort}`);
});

redisClient.on('reconnecting', () => {
  console.log('Redis reconnecting...');
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis connection established');
    return redisClient;
  } catch (error) {
    console.error('Redis connection failed:', error.message);
    return null;
  }
};

export default redisClient;