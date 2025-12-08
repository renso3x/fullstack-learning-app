import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { signToken } from '../utils/jwt';

class BadRequestError extends Error {
  statusCode = 400;
}

class UnauthorizedError extends Error {
  statusCode = 401;
}

export const authService = {
  async register(name: string, email: string, password: string, role?: string) {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new BadRequestError('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      passwordHash,
      role: role || 'learner',
    });

    const token = signToken({
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new UnauthorizedError('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new UnauthorizedError('Invalid credentials');

    const token = signToken({
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};
