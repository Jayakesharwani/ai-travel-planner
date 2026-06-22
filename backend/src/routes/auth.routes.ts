import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { getMe } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

export default router;

router.get('/me', authenticate, asyncHandler(getMe));