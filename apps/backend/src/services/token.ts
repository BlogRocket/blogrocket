import * as uuid from 'uuid';

export default class TokenService {
  private static prefix: string = 'brp_';

  /** Generate a random token */
  static generateToken() {
    return TokenService.prefix + uuid.v4().replace(/-/g, '');
  }

  static isPAT(token: string) {
    return token.startsWith(TokenService.prefix);
  }
}