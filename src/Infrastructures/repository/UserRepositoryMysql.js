import { PrismaClient } from '@prisma/client';
import RegisteredUser from '../../Domains/users/entities/RegisteredUser';
import UserRepository from '../../Domains/users/UserRepository';
import InvariantError from '../../Commons/InvariantError';

class UserRepositoryMysql extends UserRepository {
  constructor(prisma) {
    super(); // Panggil konstruktor superclass
    this._prisma = prisma;
  }

  async addUser(registerUser) {
    const { email, password, name, role_id } = registerUser;
    const newUser = await this._prisma.user.create({
      data: {
        email,
        password,
        name,
        role_id,
      },
    });
    return new RegisteredUser(newUser);
  }

  async verifyAvailableEmail(email) {
    const user = await this._prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      throw new InvariantError("USER_EMAIL.NOT_AVAILABLE");
    }
  }

  async getPasswordByEmail(email) {
    const user = await this._prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new InvariantError("USER_EMAIL.NOT_MATCH");
    }
    return user.password;
  }

  async getIdByEmail(email) {
    const user = await this._prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new InvariantError("USER_EMAIL.NOT_FOUND");
    }
    return user.id;
  }
}

export default UserRepositoryMysql;
