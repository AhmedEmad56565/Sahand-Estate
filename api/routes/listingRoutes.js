import { Router } from 'express';
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from '../controllers/listingControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create', protect, createListing);
router.delete('/delete/:id', protect, deleteListing);
router.put('/update/:id', protect, updateListing);
router.get('/get/:id', protect, getListing);

export default router;
