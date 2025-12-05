import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { auth } from '../middleware/auth';

export const courseRouter = Router();

courseRouter.get('/', courseController.getActive);
courseRouter.post('/', auth('faculty', 'admin'), courseController.create);
courseRouter.patch('/:id', auth('faculty', 'admin'), courseController.update);
