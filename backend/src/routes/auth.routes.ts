import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { loginSchema, registerSchema } from '../validation/auth.schema';
import { validate } from '../middleware/validate';

export const authRouter = Router();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);