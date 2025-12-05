import { Request, Response, NextFunction } from 'express';
import { metricsService } from '../services/metrics.service';

export const metricsController = {
  async summary(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await metricsService.summary();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
