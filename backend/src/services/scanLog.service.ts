import { EnrollmentModel } from '../models/enrollment.model';
import { ScanLogModel } from '../models/scanLog.model';

class BadRequestError extends Error {
  statusCode = 400;
}

export const scanLogService = {
  async create(userId: string, data: any) {
    const { courseId } = data;

    const enrolled = await EnrollmentModel.findOne({ userId, courseId });
    if (!enrolled) throw new BadRequestError('Not enrolled in this course');

    return ScanLogModel.create({ ...data, userId });
  },

  async getMyScanLogs(userId: string) {
    return ScanLogModel.find({ userId }).sort({ dateOfScan: -1 });
  },

  async getFiltered(query: any) {
    const filter: any = {};
    if (query.userId) filter.userId = query.userId;
    if (query.courseId) filter.courseId = query.courseId;

    if (query.from || query.to) {
      filter.dateOfScan = {};
      if (query.from) filter.dateOfScan.$gte = new Date(query.from);
      if (query.to) filter.dateOfScan.$lte = new Date(query.to);
    }

    return ScanLogModel.find(filter).sort({ dateOfScan: -1 });
  },
};
