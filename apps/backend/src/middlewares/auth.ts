import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/appError';
import handleAsync from '../utils/handleAsync';
import JwtService from '../services/jwt';
import Cache from '../services/cache';
import User from '../models/User';
import TokenService from '../services/token';
import Token from '../models/Token';

export const requireAccess = handleAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get('Authorization');
  if (!authorization) throw new AppError('Unauthorized', 401);
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) throw new AppError('Unauthorized', 401);

  try {
    const decoded = JwtService.decode(token)

    if (!JwtService.isAccess(decoded)) {
      next(new AppError("Invalid access", 401))
    }

    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) throw new AppError('Unauthorized', 401);

    req.user = user;
    if (req.url.endsWith('/logout')) {
      req.body.refresh = decoded.jti
    }
    next();
  } catch (err) {
    throw new AppError('Invalid access', 401);
  }
});

export const requireAccessOrPAT = handleAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get('Authorization');
  if (!authorization) throw new AppError('Unauthorized', 401);
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) throw new AppError('Unauthorized', 401);

  if (TokenService.isPAT(token)) {
    const savedToken = await Token.findOne({ token });
    if (!savedToken) throw new AppError('Unauthorized', 401);

    // Check if token is expired
    if (savedToken.expires.getTime() < Date.now()) {
      throw new AppError('Unauthorized', 401);
    }

    // Get IP address of request
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    savedToken.lastIp = ip as string;
    savedToken.lastUsed = new Date();
    await savedToken.save();

    const userId = savedToken.userId;
    const user = await User.findById(userId);
    if (!user) throw new AppError('Unauthorized', 401);
    req.user = user;
    return next();
  };

  return requireAccess(req, _res, next);
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

    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) throw new AppError('Unauthorized', 401);

    req.user = user;
    next();
  } catch (err) {
    throw new AppError('Invalid refresh', 401);
  }
});
