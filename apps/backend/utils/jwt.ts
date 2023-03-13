import jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}
