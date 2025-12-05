import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  errors?: any;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  const status = err.statusCode || 500;

  res.status(status).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors || null,
  });
}
