import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollment.controller';
import { auth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { enrollSchema } from '../validation/enrollment.schema';

export const enrollmentRouter = Router();

enrollmentRouter.post('/', auth('learner','faculty', 'admin'), validate(enrollSchema), enrollmentController.enroll);
enrollmentRouter.get(
  '/me',
  auth('learner', 'faculty', 'admin'),
  enrollmentController.getMine
);
