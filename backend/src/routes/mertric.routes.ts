import { Router } from 'express';
import { metricsController } from '../controllers/metrics.controller';
import { auth } from '../middleware/auth';

export const metricsRouter = Router();

metricsRouter.get(
  '/summary',
  auth('faculty', 'admin'),
  metricsController.summary
);
