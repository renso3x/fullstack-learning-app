import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { auth } from '../middleware/auth';
import { createCourseSchema, updateCourseSchema } from '../validation/course.schema';
import { validate } from '../middleware/validate';

export const courseRouter = Router();

courseRouter.get('/', courseController.getActive);
courseRouter.post('/', auth('faculty', 'admin'), validate(createCourseSchema), courseController.create);
courseRouter.patch('/:id', auth('faculty', 'admin'), validate(updateCourseSchema), courseController.update);