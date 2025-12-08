import mongoose from 'mongoose';
import {
  scanLogService,
} from '../src/services/scanLog.service';
import { EnrollmentModel } from '../src/models/enrollment.model';

describe('ScanLog Service', () => {
  it('should create a scan log for enrolled user', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const courseId = new mongoose.Types.ObjectId().toString();

    await EnrollmentModel.create({
      userId,
      courseId,
      status: 'enrolled',
    });

    const scan = await scanLogService.create(userId, {
      courseId,
      title: 'FAST Exam',
      indication: 'Pain',
      location: 'ER',
      dateOfScan: new Date().toISOString(),
      notes: 'OK',
    });


    expect(scan.userId.toString()).toBe(userId);
    expect(scan.courseId.toString()).toBe(courseId);
    expect(scan.title).toBe('FAST Exam');
  });
});
