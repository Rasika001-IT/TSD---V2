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

// ❌ Remove dotenv (not needed in Docker)
// import dotenv from 'dotenv';
// dotenv.config();

const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = Number(process.env.REDIS_PORT) || 6379;
const redisPassword = process.env.REDIS_PASSWORD || undefined;

const redisClient = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
  password: redisPassword,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log(`Redis connected successfully on ${redisHost}:${redisPort}`);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
  }
};

export default redisClient;
