import { Router } from 'express';
import { test } from '../controllers/userControllers.js';

const router = Router();

router.get('/', test);

export default router;
