import { Router } from 'express';
import { scanLogController } from '../controllers/scanLog.controller';
import { auth } from '../middleware/auth';

export const scanLogRouter = Router();

scanLogRouter.post('/', auth('learner'), scanLogController.create);
scanLogRouter.get('/me', auth('learner'), scanLogController.getMine);
scanLogRouter.get('/', auth('faculty', 'admin'), scanLogController.getFiltered);
