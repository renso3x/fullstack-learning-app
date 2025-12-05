import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';

class UnauthorizedError extends Error {
  statusCode = 401;
}
class ForbiddenError extends Error {
  statusCode = 403;
}

export function auth(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) throw new UnauthorizedError('Missing Authorization header');

    const token = header.replace('Bearer ', '');

    let payload: JwtPayload;
    try {
      payload = verifyToken(token);
    } catch (err) {
      throw new UnauthorizedError('Invalid token');
    }

    (req as any).user = payload;

    // If route requires roles
    if (roles.length && !roles.includes(payload.role)) {
      throw new ForbiddenError('Insufficient role');
    }

    next();
  };
}
