import { Router } from 'express';
import { updateUser, deleteUser } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.put('/update/:id', protect, updateUser);
router.delete('/delete/:id', protect, deleteUser);

export default router;
