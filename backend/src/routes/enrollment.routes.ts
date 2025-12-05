import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollment.controller';
import { auth } from '../middleware/auth';

export const enrollmentRouter = Router();

enrollmentRouter.post('/', auth('learner'), enrollmentController.enroll);
enrollmentRouter.get('/me', auth('learner'), enrollmentController.getMine);
