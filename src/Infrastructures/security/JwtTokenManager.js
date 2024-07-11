import jwt from 'jsonwebtoken';
import InvariantError from '../../Commons/InvariantError';

class JwtTokenManager {
  constructor(jwtLib) {
    this._jwt = jwtLib;
  }

  async createAccessToken(payload) {
    return this._jwt.sign(payload, process.env.ACCESS_TOKEN_KEY);
  }

  async createRefreshToken(payload) {
    return this._jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyRefreshToken(token) {
    try {
      const payload = this._jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
      return payload;
    } catch (error) {
      throw new InvariantError('REFRESH_TOKEN.INVALID');
    }
  }

  async decodePayload(token) {
    const payload = this._jwt.decode(token);
    return payload;
  }
}

export default JwtTokenManager;
