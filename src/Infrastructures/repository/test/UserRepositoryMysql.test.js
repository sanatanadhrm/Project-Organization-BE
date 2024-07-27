const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepositoryMysql = require('../UserRepositoryMysql');
const mysql = require('../../../Infrastructures/database/mysql/mysql');
const InvariantError = require('../../../Commons/InvariantError');
const { cleanTable, findUsersByEmail, addRoleTable, addUser } = require('../../../lib/UserTableHelper');

describe('UserRepositoryMysql', () => {

  beforeEach(async () => {
    await addRoleTable();
  });
  afterEach(async () => {
    await cleanTable();
  });

  afterAll(async () => {
    await mysql.$disconnect();
  });

  describe('verifyAvailableEmail function', () => {
    it("should throw error when email isn't available", async () => {
        // Arrange
        await addUser({email: 'dicoding@gmail.com'});
        const userRepository = new UserRepositoryMysql(mysql);

        // Action & Assert
        await expect(userRepository.verifyAvailableEmail('dicoding@gmail.com')).rejects.toThrow(InvariantError);
    });
    it('should not throw error when email is available', async () => {
        // Arrange
        const userRepository = new UserRepositoryMysql(mysql);

        // Action & Assert
        await expect(userRepository.verifyAvailableEmail('dicoding@gmail.com')).resolves.not.toThrow(InvariantError);
    });
  });

  describe('addUser', () => {
    it('should persist user and return user id', async () => {
      // Arrange
      const userData = {
        email: 'dicoding@gmail.com',
        password: 'secret',
        name: 'Dicoding Indonesia',
        role_id: 1,
        category: 1
      };

      // Action
      const userRepository = new UserRepositoryMysql(mysql);
      await userRepository.addUser(userData);

      // Assert
      const users = await findUsersByEmail('dicoding@gmail.com');
      expect(users).toHaveLength(1);
    });
    it('should return registered user correctly', async () => {
        // Arrange
        const userData = {
            email: 'dicoding@gmail.com',
            password: 'secret',
            name: 'Dicoding Indonesia',
            role_id: 1,
            category: 1
          };
    
        // Action
        const userRepository = new UserRepositoryMysql(mysql);
        const registered = await userRepository.addUser(userData);
        expect(registered).toStrictEqual(new RegisteredUser({
            id: registered.id,
            email: 'dicoding@gmail.com',
            name: 'Dicoding Indonesia',
        }))
    });
  });

  describe('getPasswordByEmail', () => {
    it('should return password correctly', async () => {
      await addUser({email: 'dicoding@gmail.com', password: 'secret'});
      const userRepository = new UserRepositoryMysql(mysql);

      const password = await userRepository.getPasswordByEmail('dicoding@gmail.com');
      expect(password).toEqual('secret');
    });
    it('should throw InvariantError when email not found', async () => {
      const userRepository = new UserRepositoryMysql(mysql);

      await expect(userRepository.getPasswordByEmail('dicoding@gmail.com')).rejects.toThrow(InvariantError);
    });
  });

  describe('getIdByEmail', () => {
    it('should return id correctly', async () => {
      await addUser({id: 1, email: 'dicoding@gmail.com', password: 'secret'});
      const userRepository = new UserRepositoryMysql(mysql);

      const id = await userRepository.getIdByEmail('dicoding@gmail.com');
      expect(id).toEqual(1);
    });
    it('should throw InvariantError when email not found', async () => {
      const userRepository = new UserRepositoryMysql(mysql);

      await expect(userRepository.getIdByEmail('dicoding@gmail.com')).rejects.toThrow(InvariantError);
    });
  });
});
