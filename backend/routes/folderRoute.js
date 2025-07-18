import express from 'express';

const router = express.Router();

import { createFolder, getFolders } from '../controllers/folderController.js';

router.post('/createfolder', createFolder);
router.get('/getfolders', getFolders);
export default router;
