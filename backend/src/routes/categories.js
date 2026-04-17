import express from 'express';
import { categoriesController } from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', categoriesController.getAllCategories);



// maually cache refresh endpoint for testing purposes
router.post('/refresh', categoriesController.refreshCache);

export default router;