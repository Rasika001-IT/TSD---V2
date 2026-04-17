import { wordpressService } from './wordpressService.js';
import { cacheService, cacheKeys} from './cacheService.js';
import { REFRESH_INTERVAL, CACHE_TTL } from '../config/wordpress.js';
import { logger } from '../utils/logger.js';


class RefreshService {
    constructor() {
        this.intervals = [];
    }

    async refreshAllPosts() {
        try {
        logger.info('Refreshing all posts cache');
        const posts = await wordpressService.fetchAllPosts();
        await cacheService.set(cacheKeys.ALL_POSTS, posts, CACHE_TTL.POSTS);
        await cacheService.setLastModified(new Date().toISOString());
        logger.info(`Refreshed ${posts.length} posts to cache`);
        return posts;
        } catch (error) {
        logger.error('Failed to refresh posts cache', error.message);
        throw error;
        }
    }


    async refreshCategories() {
        try {
        logger.info('Refreshing categories cache');
        const categories = await wordpressService.fetchCategories();
        await cacheService.set(cacheKeys.CATEGORIES, categories, CACHE_TTL.CATEGORIES);
        logger.info(`Refreshed ${categories.length} categories to cache`);
        return categories;
        } catch (error) {
        logger.error('Failed to refresh categories cache', error.message);
        throw error;
        }
    }


    async refreshTags() {
        try {
        logger.info('Refreshing tags cache');
        const tags = await wordpressService.fetchTags();
        await cacheService.set(cacheKeys.TAGS, tags, CACHE_TTL.TAGS);
        logger.info(`Refreshed ${tags.length} tags to cache`);
        return tags;
        } catch (error) {
        logger.error('Failed to refresh tags cache', error.message);
        throw error;
        }
    }


    async refreshPostBySlug(slug) {
        try {
        const post = await wordpressService.fetchPostBySlug(slug);
        if (post) {
            await cacheService.set(cacheKeys.POST_BY_SLUG(slug), post, CACHE_TTL.SINGLE_POST);
            logger.info(`Refreshed post ${slug} to cache`);
        }
        return post;
        } catch (error) {
        logger.error(`Failed to refresh post ${slug}`, error.message);
        throw error;
        }
    }


    async refreshPostsByCategory(categoryId) {
        try {
        const posts = await wordpressService.fetchPostsByCategory(categoryId);
        await cacheService.set(cacheKeys.POSTS_BY_CATEGORY(categoryId), posts, CACHE_TTL.POSTS);
        logger.info(`Refreshed ${posts.length} posts for category ${categoryId}`);
        return posts;
        } catch (error) {
        logger.error(`Failed to refresh posts for category ${categoryId}`, error.message);
        throw error;
        }
    }


    startBackgroundRefresh() {
        logger.info('Starting background refresh service');

        // Posts refresh every 5 minutes (300 seconds)
        this.intervals.push(
            setInterval(() => {
                this.refreshAllPosts().catch((err) => logger.error('Background refresh posts error', err));
            }, REFRESH_INTERVAL.POSTS * 1000)
        );

        // Categories refresh every 1 hour (3600 seconds)
        this.intervals.push(
            setInterval(() => {
                this.refreshCategories().catch((err) => logger.error('Background refresh categories error', err));
            }, REFRESH_INTERVAL.CATEGORIES * 1000)
        );

        // Tags refresh every 1 hour (3600 seconds)
        this.intervals.push(
            setInterval(() => {
                this.refreshTags().catch((err) => logger.error('Background refresh tags error', err));
            }, REFRESH_INTERVAL.TAGS * 1000)
        );

        logger.info('Background refresh service started');
    }


    stopBackgroundRefresh() {
        this.intervals.forEach((interval) => clearInterval(interval));
        this.intervals = [];
        logger.info('Background refresh service stopped');
    }


    async initialWarmup() {
        logger.info('Starting cache warmup...');
        try {
        await Promise.all([
            this.refreshAllPosts(),
            this.refreshCategories(),
            this.refreshTags(),
        ]);
        logger.info('Cache warmup completed');
        } catch (error) {
        logger.error('Cache warmup failed', error.message);
        }
    }
    }

    export default new RefreshService();