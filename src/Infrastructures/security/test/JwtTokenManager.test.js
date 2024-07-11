import jwt from 'jsonwebtoken';
import JwtTokenManager from '../JwtTokenManager';
import InvariantError from '../../../Commons/InvariantError';

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      const payload = { email: 'dicoding@gmail.com' };
      const mockJwtToken = {
        sign: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const accessToken = await jwtTokenManager.createAccessToken(payload);

      expect(mockJwtToken.sign).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      const payload = { username: 'dicoding' };
      const mockJwtToken = {
        sign: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      expect(mockJwtToken.sign).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(refreshToken).toEqual('mock_token');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      const mockJwtToken = {
        verify: jest.fn().mockImplementation(() => { throw new Error('verification failed'); }),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      await expect(jwtTokenManager.verifyRefreshToken('invalid_token')).rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError when refresh token verified', async () => {
      const mockJwtToken = {
        verify: jest.fn().mockImplementation(() => ({ username: 'dicoding' })),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      await expect(jwtTokenManager.verifyRefreshToken('valid_token')).resolves.not.toThrow(InvariantError);
    });
  });

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      const mockJwtToken = {
        decode: jest.fn().mockImplementation(() => ({ username: 'dicoding' })),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const payload = await jwtTokenManager.decodePayload('token');

      expect(payload).toEqual({ username: 'dicoding' });
    });
  });
});
