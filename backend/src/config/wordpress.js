import dotenv from 'dotenv';

dotenv.config();

export const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;


export const CACHE_TTL = {
    POSTS: parseInt(process.env.CACHE_TTL_POSTS),
    CATEGORIES: parseInt(process.env.CACHE_TTL_CATEGORIES),
    TAGS: parseInt(process.env.CACHE_TTL_TAGS),
    SINGLE_POST: parseInt(process.env.CACHE_TTL_SINGLE_POST),
};



export const REFRESH_INTERVAL = {
    POSTS: parseInt(process.env.REFRESH_INTERVAL_POSTS),
    CATEGORIES: parseInt(process.env.REFRESH_INTERVAL_CATEGORIES),
    TAGS: parseInt(process.env.REFRESH_INTERVAL_TAGS),
};