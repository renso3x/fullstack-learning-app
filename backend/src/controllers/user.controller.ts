import { Request, Response } from 'express';
import { userService } from '../services/users.service';

export const userController = {
  async listUsers(req: Request, res: Response) {
    const { role } = req.query;

    const filter: any = {};
    if (role) filter.role = role;

    const users = await userService.listUsers(filter);
    res.json(users);
  },
};
