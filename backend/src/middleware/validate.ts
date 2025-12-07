import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const err = new Error('Validation error') as any;
      err.statusCode = 400;
      err.errors = result.error.flatten();
      return next(err);
    }

    next();
  };
