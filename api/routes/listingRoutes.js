import { Router } from 'express';
import { createListing } from '../controllers/listingControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create', protect, createListing);

export default router;
