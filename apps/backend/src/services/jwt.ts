import jwt, { JwtPayload } from 'jsonwebtoken';
import { getEnv } from '../utils/config';

export default class JwtService {
  static generate(userId: string, email: string) {
    const refresh = jwt.sign(
      { userId, type: getEnv('JWT_REFRESH') },
      getEnv('JWT_SECRET'),
      {
        subject: email,
        expiresIn: parseInt(getEnv('JWT_REFRESH_EXPIRES_IN'), 10),
        audience: getEnv('JWT_AUDIENCE'),
        issuer: getEnv('JWT_ISSUER')
      }
    )

    const access = jwt.sign(
      { userId, type: getEnv('JWT_ACCESS') },
      getEnv('JWT_SECRET'),
      {
        subject: email,
        expiresIn: parseInt(getEnv('JWT_ACCESS_EXPIRES_IN'), 10),
        audience: getEnv('JWT_AUDIENCE'),
        issuer: getEnv('JWT_ISSUER'),
        jwtid: refresh
      },
    );

    return { access, refresh };
  }

  static decode(token: string) {
    return jwt.verify(token, getEnv('JWT_SECRET')) as JwtPayload
  }

  static isAccess(decoded: any) {
    return (
      decoded.type === getEnv('JWT_ACCESS') &&
      decoded.aud === getEnv('JWT_AUDIENCE') &&
      decoded.iss === getEnv('JWT_ISSUER')
    )
  }

  static isRefresh(decoded: any) {
    return (
      decoded.type === getEnv('JWT_REFRESH') &&
      decoded.aud === getEnv('JWT_AUDIENCE') &&
      decoded.iss === getEnv('JWT_ISSUER')
    )
  }
}