import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/appError';
import handleAsync from '../utils/handleAsync';
import JwtService from '../services/jwt';
import Cache from '../services/cache';

export const requireAccess = handleAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const [bearer, token] = req.get('Authorization')?.split(' ');
  if (bearer !== 'Bearer' || !token) throw new AppError('Unauthorized', 401);

  try {
    const decoded = JwtService.decode(token)

    if (!JwtService.isAccess(decoded)) {
      next(new AppError("Invalid access", 401))
    }

    const userId = decoded.userId;

    req.user = { id: userId, email: decoded.sub }
    next();
  } catch (err) {
    throw new AppError('Invalid access', 401);
  }
});

export const requireAccess2 = handleAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const [bearer, token] = req.get('Authorization')?.split(' ');
  if (bearer !== 'Bearer' || !token) throw new AppError('Unauthorized', 401);

  try {
    const decoded = JwtService.decode(token)

    if (!JwtService.isAccess(decoded)) {
      next(new AppError("Invalid access", 401))
    }

    const userId = decoded.userId;

    req.user = { id: userId, email: decoded.sub }
    req.body.refresh = decoded.jti
    next();
  } catch (err) {
    throw new AppError('Invalid access', 401);
  }
});

export const requireRefresh = handleAsync(async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body.refresh) throw new AppError('Unauthorized', 401);

  const token = req.body.refresh;
  try {
    const decoded = JwtService.decode(token);

    if (!JwtService.isRefresh(decoded)) {
      next(new AppError("Invalid refresh", 401))
    }

    const value = await Cache.get(`non_refresh_${token}`);
    if (value) next(new AppError("Refresh already used", 401))

    req.user = { id: decoded.userId, email: decoded.sub }
    next();
  } catch (err) {
    throw new AppError('Invalid refresh', 401);
  }
});
