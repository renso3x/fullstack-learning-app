import { Request, Response, NextFunction } from 'express';
import { scanLogService } from '../services/scanLog.service';

export const scanLogController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const scan = await scanLogService.create(userId, req.body);
      res.status(201).json(scan);
    } catch (err) {
      next(err);
    }
  },

  async getMine(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const scans = await scanLogService.getMyScanLogs(userId);
      res.json(scans);
    } catch (err) {
      next(err);
    }
  },

  async getFiltered(req: Request, res: Response, next: NextFunction) {
    try {
      const scans = await scanLogService.getFiltered(req.query);
      res.json(scans);
    } catch (err) {
      next(err);
    }
  },

  async listScanLogs(req: Request, res: Response) {
    const { userId, courseId, startDate, endDate } = req.query;

    const filter: any = {};

    if (userId) filter.userId = userId;
    if (courseId) filter.courseId = courseId;
    if (startDate || endDate) {
      filter.dateOfScan = {};
      if (startDate) filter.dateOfScan.$gte = new Date(startDate as string);
      if (endDate) filter.dateOfScan.$lte = new Date(endDate as string);
    }

    const logs = await scanLogService.listScanLogs(filter);

    res.json(logs);
  },
};
