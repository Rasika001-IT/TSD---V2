import { wordpressService } from '../services/wordpressService.js';
import { cacheService, cacheKeys } from '../services/cacheService.js';
import refreshService from '../services/refreshService.js';
import { logger } from '../utils/logger.js';


export const categoriesController = {
    async getAllCategories(req, res) {
        try {
        const cachedCategories = await cacheService.get(cacheKeys.CATEGORIES);
        
        if (cachedCategories) {
            return res.json(cachedCategories);
        }

        const categories = await wordpressService.fetchCategories();
        await cacheService.set(cacheKeys.CATEGORIES, categories);
        
        res.json(categories);
        } catch (error) {
        logger.error('Error in getAllCategories', error.message);
        res.status(500).json({ error: 'Failed to fetch categories' });
        }
    },


    

    // maually cache refresh endpoint for testing purposes
    async refreshCache(req, res) {
        try {
        await refreshService.refreshCategories();
        res.json({ message: 'Categories cache refreshed successfully' });
        } catch (error) {
        logger.error('Error in refreshCache', error.message);
        res.status(500).json({ error: 'Failed to refresh cache' });
        }
    },
};