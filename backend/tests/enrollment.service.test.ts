import { enrollmentService } from '../src/services/enrollment.service';
import { CourseModel } from '../src/models/course.model';
import { UserModel } from '../src/models/user.model';

describe('Enrollment Service', () => {
  it('should allow learner to enroll in active course', async () => {
    const user = await UserModel.create({
      name: 'Romeo',
      email: 'x@y.com',
      passwordHash: 'x',
      role: 'learner',
    });
    const course = await CourseModel.create({
      title: 'FAST',
      modality: 'Abdominal',
      status: 'active',
    });

    const enrollment = await enrollmentService.enroll(user._id.toString(), course._id.toString());

    expect(enrollment.courseId.toString()).toBe(course._id.toString());
  });
});
