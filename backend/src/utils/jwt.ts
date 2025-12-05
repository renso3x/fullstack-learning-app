
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { UserRole } from '../models/user.model';

export interface JwtPayload {
  id: string;
  role: UserRole;
  email: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
}