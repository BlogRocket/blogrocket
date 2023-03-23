import type { IUser } from "./models/User";

declare global {
  namespace Express {
    export interface Request {
      token: string;
      user: IUser;
    }
  }
}