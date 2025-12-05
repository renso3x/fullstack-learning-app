import { UserModel } from '../models/user.model';
import { ScanLogModel } from '../models/scanLog.model';

export const metricsService = {
  async summary() {
    // 1. Total learners
    const totalLearners = await UserModel.countDocuments({ role: 'learner' });

    // 2. Total scans
    const totalScans = await ScanLogModel.countDocuments();

    // 3. Scans per course
    const scansPerCourse = await ScanLogModel.aggregate([
      { $group: { _id: '$courseId', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
      {
        $project: {
          _id: 0,
          courseId: '$_id',
          courseTitle: '$course.title',
          count: 1,
        },
      },
    ]);

    // 4. Scans per learner
    const scansPerLearner = await ScanLogModel.aggregate([
      { $group: { _id: '$userId', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          learnerName: '$user.name',
          count: 1,
        },
      },
    ]);

    return {
      totalLearners,
      totalScans,
      scansPerCourse,
      scansPerLearner,
    };
  },
};
