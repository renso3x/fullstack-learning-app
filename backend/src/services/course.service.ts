import { CourseModel } from '../models/course.model';

class NotFoundError extends Error {
  statusCode = 404;
}

export const courseService = {
  async getActiveCourses() {
    return CourseModel.find({ status: 'active' });
  },

  async createCourse(data: any) {
    return CourseModel.create(data);
  },

  async updateCourse(id: string, updates: any) {
    const course = await CourseModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!course) throw new NotFoundError('Course not found');
    return course;
  },
};
