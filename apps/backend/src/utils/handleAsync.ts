import { NextFunction, Request, Response } from 'express';

/**
 * Handle async function
 * @param fn Async function
 * @returns Express route handler
 */
const handleAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default handleAsync;
