import express from 'express';

const router = express.Router();

import { createFolder, getFolders } from '../controllers/folderController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

router.post('/createfolder',authMiddleware, createFolder);
router.get('/getfolders',authMiddleware, getFolders);
export default router;
