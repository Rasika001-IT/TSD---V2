import { wordpressService } from '../services/wordpressService.js';
import { cacheService, cacheKeys } from '../services/cacheService.js';
import refreshService from '../services/refreshService.js';
import { logger } from '../utils/logger.js';


export const tagsController = {
    async getAllTags(req, res) {
        try {
        const cachedTags = await cacheService.get(cacheKeys.TAGS);
        
        if (cachedTags) {
            return res.json(cachedTags);
        }

        const tags = await wordpressService.fetchTags();
        await cacheService.set(cacheKeys.TAGS, tags);
        
        res.json(tags);
        } catch (error) {
        logger.error('Error in getAllTags', error.message);
        res.status(500).json({ error: 'Failed to fetch tags' });
        }
    },



    // maually cache refresh endpoint for testing purposes
    async refreshCache(req, res) {
        try {
        await refreshService.refreshTags();
        res.json({ message: 'Tags cache refreshed successfully' });
        } catch (error) {
        logger.error('Error in refreshCache', error.message);
        res.status(500).json({ error: 'Failed to refresh cache' });
        }
    },
};