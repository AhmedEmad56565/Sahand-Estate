import { Router } from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
} from '../controllers/listingControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create', protect, createListing);
router.delete('/delete/:id', protect, deleteListing);
router.put('/update/:id', protect, updateListing);

export default router;
