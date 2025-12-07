import { Router } from 'express';
import { scanLogController } from '../controllers/scanLog.controller';
import { auth } from '../middleware/auth';
import { createScanLogSchema } from '../validation/scanLog.schema';
import { validate } from '../middleware/validate';

export const scanLogRouter = Router();

scanLogRouter.post(
  '/',
  auth('learner'),
  validate(createScanLogSchema),
  scanLogController.create
);
scanLogRouter.get('/me', auth('learner'), scanLogController.getMine);
scanLogRouter.get('/', auth('faculty', 'admin'), scanLogController.getFiltered);
