import { Router } from 'express';
import {userController} from '../controllers/user.controller';
import { auth } from '../middleware/auth';

export const userRouter = Router();

userRouter.get('/', auth('faculty', 'admin'), userController.listUsers);
