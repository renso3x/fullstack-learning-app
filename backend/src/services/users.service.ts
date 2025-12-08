import { UserModel } from '../models/user.model';

export const userService = {
  async listUsers(filter: any = {}) {
    return UserModel.find(filter).select('-passwordHash');
  },
};
