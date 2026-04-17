import express from 'express';
import { postsController } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', postsController.getAllPosts);
router.get('/paginated', postsController.getPostsWithPagination);
router.get('/slug/:slug', postsController.getPostBySlug);
router.get('/category/:categoryId', postsController.getPostsByCategory);
router.get('/tag/:tagId', postsController.getPostsByTag);


// maually cache refresh endpoint for testing purposes
router.post('/refresh', postsController.refreshCache);

export default router;