import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import AppError from '../utils/appError';
import Cache from '../utils/cache';
import handleAsync from '../utils/handleAsync';

const requireAuth = handleAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new AppError('Unauthorized', 401);

  const userId = await Cache.get(`auth:${token}`);
  if (!userId) throw new AppError('Unauthorized', 401);

  const user = await User.findById(userId);
  if (!user) {
    await Cache.del(`auth:${token}`);
    throw new AppError('Unauthorized', 401);
  }

  req.token = token;
  req.user = user as IUser;
  next();
});

export default requireAuth;
