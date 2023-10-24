import { Router } from 'express';
import {
  updateUser,
  deleteUser,
  signout,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.put('/update/:id', protect, updateUser);
router.delete('/delete/:id', protect, deleteUser);
router.post('/signout', protect, signout);

export default router;
