import express from 'express';
import { tagsController } from '../controllers/tagsController.js';

const router = express.Router();

router.get('/', tagsController.getAllTags);


// maually cache refresh endpoint for testing purposes
router.post('/refresh', tagsController.refreshCache);

export default router;