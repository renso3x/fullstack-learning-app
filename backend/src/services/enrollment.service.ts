import { EnrollmentModel } from '../models/enrollment.model';
import { CourseModel } from '../models/course.model';

class BadRequestError extends Error {
  statusCode = 400;
}
class NotFoundError extends Error {
  statusCode = 404;
}

export const enrollmentService = {
  async enroll(userId: string, courseId: string) {
    const course = await CourseModel.findById(courseId);
    if (!course) throw new NotFoundError('Course not found');
    if (course.status !== 'active')
      throw new BadRequestError('Course inactive');

    // unique index prevents duplicates
    const enrollment = await EnrollmentModel.create({ userId, courseId });
    return enrollment;
  },

  async getMyCourses(userId: string) {
    return EnrollmentModel.find({ userId }).populate('courseId');
  },
};
