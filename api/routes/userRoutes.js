import { Router } from 'express';
import { updateUser } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.put('/update/:id', protect, updateUser);

export default router;
