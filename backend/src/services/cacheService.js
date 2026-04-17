import redisClient from '../config/redis.js';
import { CACHE_TTL } from '../config/wordpress.js';
import { logger } from '../utils/logger.js';


export const cacheKeys = {
    ALL_POSTS: 'tsd:posts:all',
    CATEGORIES: 'tsd:categories:all',
    TAGS: 'tsd:tags:all',
    POST_BY_SLUG: (slug) => `tsd:post:slug:${slug}`,
    POSTS_BY_CATEGORY: (categoryId) => `tsd:posts:category:${categoryId}`,
    POSTS_BY_TAG: (tagId) => `tsd:posts:tag:${tagId}`,
    POSTS_PAGINATED: (page, perPage) => `tsd:posts:page:${page}:per:${perPage}`,
    LAST_MODIFIED: 'tsd:last_modified',
};



export const cacheService = {
    async get(key) {
        try {
        const data = await redisClient.get(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
        } catch (error) {
        logger.error(`Cache get error for key ${key}`, error.message);
        return null;
        }
    },


    async set(key, value, ttl = CACHE_TTL.POSTS) {
        try {
        await redisClient.setEx(key, ttl, JSON.stringify(value));
        logger.info(`Cache set for key ${key} with TTL ${ttl}s`);
        return true;
        } catch (error) {
        logger.error(`Cache set error for key ${key}`, error.message);
        return false;
        }
    },


    async delete(key) {
        try {
        await redisClient.del(key);
        logger.info(`Cache deleted for key ${key}`);
        return true;
        } catch (error) {
        logger.error(`Cache delete error for key ${key}`, error.message);
        return false;
        }
    },


    async deletePattern(pattern) {
        try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
            logger.info(`Cache deleted ${keys.length} keys matching pattern ${pattern}`);
        }
        return true;
        } catch (error) {
        logger.error(`Cache delete pattern error for ${pattern}`, error.message);
        return false;
        }
    },


    async invalidatePostsCache() {
        await this.deletePattern('tsd:posts:*');
        await this.delete(cacheKeys.ALL_POSTS);
        logger.info('All posts cache invalidated');
    },


    async invalidateCategoriesCache() {
        await this.delete(cacheKeys.CATEGORIES);
        logger.info('Categories cache invalidated');
    },


    async invalidateTagsCache() {
        await this.delete(cacheKeys.TAGS);
        logger.info('Tags cache invalidated');
    },


    async getLastModified() {
        return await this.get(cacheKeys.LAST_MODIFIED);
    },

    
    async setLastModified(date) {
        await this.set(cacheKeys.LAST_MODIFIED, { date }, CACHE_TTL.POSTS);
    },
};