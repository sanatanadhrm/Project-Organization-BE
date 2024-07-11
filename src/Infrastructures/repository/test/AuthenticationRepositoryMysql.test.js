import AuthenticationRepositoryMysql from "../AuthenticationRepositoryMysql";
import InvariantError from "../../../Commons/InvariantError";
import mysql from '../../../Infrastructures/database/mysql/mysql';
import AuthenticationTableHelper from "../../../lib/AuthenticationTableHelper";

describe('AuthenticationRepositoryMysql', () => {
    beforeEach(async () => {
        await AuthenticationTableHelper.cleanTable();
    });

    afterEach(async () => {
        await AuthenticationTableHelper.cleanTable();
    });

    afterAll(async () => {
        await mysql.$disconnect();
      });

    describe('addToken function', () => {
        it('should add token to database', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryMysql(mysql)
            const token = 'token'
    
            // Action
            await authenticationRepository.addToken(token)
    
            // Assert
            const tokens = await AuthenticationTableHelper.checkAvailabilityToken(token)
            expect(tokens).toStrictEqual({
                id: expect.any(Number),
                token: token,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        })
    });

    describe('checkAvailabilityToken function', () => {
        it('should throw InvariantError if token not available', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryMysql(mysql)
            const token = 'token'
      
            // Action & Assert
            await expect(authenticationRepository.checkAvailabilityToken(token))
              .rejects.toThrow(InvariantError)
          })
      
          it('should not throw InvariantError if token available', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryMysql(mysql)
            const token = 'token'
            await AuthenticationTableHelper.addToken(token)
      
            // Action & Assert
            await expect(authenticationRepository.checkAvailabilityToken(token))
              .resolves.not.toThrow(InvariantError)
          })
    });

    describe('deleteToken function', () => {
        it('should delete token from database', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryMysql(mysql)
            const token = 'token'
            await AuthenticationTableHelper.addToken(token)
    
            // Action
            await authenticationRepository.deleteToken(token)
    
            // Assert
            const tokens = await AuthenticationTableHelper.checkAvailabilityToken(token)
            expect(tokens).toBeNull()
        })
    });
});