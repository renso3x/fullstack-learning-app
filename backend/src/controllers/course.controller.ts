import { Request, Response, NextFunction } from 'express';
import { courseService } from '../services/course.service';

export const courseController = {
  async getActive(_req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await courseService.getActiveCourses();
      res.json(courses);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.updateCourse(req.params.id, req.body);
      res.json(course);
    } catch (err) {
      next(err);
    }
  },
};
