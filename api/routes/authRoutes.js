import { Router } from 'express';
import {
  google,
  signin,
  signup,
  signout,
} from '../controllers/authControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', protect, signout);
router.post('/google', google);

export default router;
