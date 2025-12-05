import { Router } from 'express';
import { authRouter } from './auth.routes';
import { courseRouter } from './course.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/courses', courseRouter);