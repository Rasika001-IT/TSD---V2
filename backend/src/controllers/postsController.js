import { wordpressService } from '../services/wordpressService.js';
import { cacheService, cacheKeys } from '../services/cacheService.js';
import refreshService from '../services/refreshService.js';
import { logger } from '../utils/logger.js';


export const postsController = {
    async getAllPosts(req, res) {
        try {
        const cachedPosts = await cacheService.get(cacheKeys.ALL_POSTS);
        
        if (cachedPosts) {
            logger.info('Serving posts from cache');
            return res.json(cachedPosts);
        }

        logger.info('Cache miss, fetching from WordPress');
        const posts = await wordpressService.fetchAllPosts();
        await cacheService.set(cacheKeys.ALL_POSTS, posts);
        
        res.json(posts);
        } catch (error) {
        logger.error('Error in getAllPosts', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
        }
    },


    async getPostsWithPagination(req, res) {
        try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 9;
        const cacheKey = cacheKeys.POSTS_PAGINATED(page, perPage);

        const cachedData = await cacheService.get(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        const data = await wordpressService.fetchPostsWithPagination(page, perPage);
        await cacheService.set(cacheKey, data, 600);
        
        res.json(data);
        } catch (error) {
        logger.error('Error in getPostsWithPagination', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
        }
    },


    async getPostBySlug(req, res) {
        try {
        const { slug } = req.params;
        const cacheKey = cacheKeys.POST_BY_SLUG(slug);

        const cachedPost = await cacheService.get(cacheKey);
        
        if (cachedPost) {
            return res.json(cachedPost);
        }

        const post = await wordpressService.fetchPostBySlug(slug);
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await cacheService.set(cacheKey, post);
        
        res.json(post);
        } catch (error) {
        logger.error('Error in getPostBySlug', error.message);
        res.status(500).json({ error: 'Failed to fetch post' });
        }
    },


    async getPostsByCategory(req, res) {
        try {
        const { categoryId } = req.params;
        const perPage = parseInt(req.query.per_page) || 50;
        const cacheKey = cacheKeys.POSTS_BY_CATEGORY(categoryId);

        const cachedPosts = await cacheService.get(cacheKey);
        
        if (cachedPosts) {
            return res.json(cachedPosts);
        }

        const posts = await wordpressService.fetchPostsByCategory(categoryId, perPage);
        await cacheService.set(cacheKey, posts);
        
        res.json(posts);
        } catch (error) {
        logger.error('Error in getPostsByCategory', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
        }
    },


    async getPostsByTag(req, res) {
        try {
        const { tagId } = req.params;
        const perPage = parseInt(req.query.per_page) || 50;
        const cacheKey = cacheKeys.POSTS_BY_TAG(tagId);

        const cachedPosts = await cacheService.get(cacheKey);
        
        if (cachedPosts) {
            return res.json(cachedPosts);
        }

        const posts = await wordpressService.fetchPostsByTag(tagId, perPage);
        await cacheService.set(cacheKey, posts);
        
        res.json(posts);
        } catch (error) {
        logger.error('Error in getPostsByTag', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
        }
    },




    // maually cache refresh endpoint for testing purposes
    async refreshCache(req, res) {
        try {
        await refreshService.refreshAllPosts();
        res.json({ message: 'Cache refreshed successfully' });
        } catch (error) {
        logger.error('Error in refreshCache', error.message);
        res.status(500).json({ error: 'Failed to refresh cache' });
        }
    },
};