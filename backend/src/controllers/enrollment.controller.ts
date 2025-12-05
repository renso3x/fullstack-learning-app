import { Request, Response, NextFunction } from 'express';
import { enrollmentService } from '../services/enrollment.service';

export const enrollmentController = {
  async enroll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { courseId } = req.body;

      const enrollment = await enrollmentService.enroll(userId, courseId);
      res.status(201).json(enrollment);
    } catch (err) {
      next(err);
    }
  },

  async getMine(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const courses = await enrollmentService.getMyCourses(userId);
      res.json(courses);
    } catch (err) {
      next(err);
    }
  },
};
