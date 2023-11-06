import { Router } from 'express';
import {
  createListing,
  deleteListing,
} from '../controllers/listingControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create', protect, createListing);
router.delete('/delete/:id', protect, deleteListing);

export default router;
