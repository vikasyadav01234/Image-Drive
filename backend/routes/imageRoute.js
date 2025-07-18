import express from 'express';

const router = express.Router();
import { uploadImage, serchImage, getImages } from '../controllers/imageController.js';

import { upload } from '../dbconfig/cloudinery.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

router.post('/uploadimage',authMiddleware, upload.single('image'), uploadImage);
router.get('/searchimage',authMiddleware, serchImage);
router.get('/getimages',authMiddleware, getImages);
export default router;