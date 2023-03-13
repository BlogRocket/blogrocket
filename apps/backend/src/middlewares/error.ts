import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  if (err instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
};

export default errorMiddleware;
