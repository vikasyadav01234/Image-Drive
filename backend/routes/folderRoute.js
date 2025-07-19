import express from 'express';

const router = express.Router();

import { createFolder, deleteFolder, getFolders } from '../controllers/folderController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

router.post('/createfolder',authMiddleware, createFolder);
router.get('/getfolders',authMiddleware, getFolders);
router.delete('/deletefolder',authMiddleware,deleteFolder);
export default router;
