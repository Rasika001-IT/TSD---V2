// import { createClient } from 'redis';
// import dotenv from 'dotenv';


// dotenv.config();


// const redisClient = createClient({
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: parseInt(process.env.REDIS_PORT),
//     },
//     password: process.env.REDIS_PASSWORD || undefined,
//     });

//     redisClient.on('error', (err) => {
//     console.error('Redis Client Error:', err);
//     });

//     redisClient.on('connect', () => {
//     console.log('Redis connected successfully');
// });



// export const connectRedis = async () => {
//     try {
//         await redisClient.connect();
//         return redisClient;
//     } catch (error) {
//         console.error('Failed to connect to Redis:', error);
//         throw error;
//     }
// };

// export default redisClient;



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
    connectTimeout: 10000, // 10 seconds
    lazyConnect: true, // Don't connect immediately
  },
  password: redisPassword,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
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
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await redisClient.connect();
      console.log('Redis connection established');
      return redisClient;
    } catch (error) {
      console.error(`Redis connection attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt === maxRetries) {
        console.error('Max Redis connection retries reached. Continuing without Redis...');
        return null; // Return null instead of throwing
      }
      
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

export default redisClient;