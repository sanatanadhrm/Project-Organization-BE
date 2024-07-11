import AddUserUseCase from "../../../../Applications/usecase/AddUserUseCase";
import UserRepositoryMysql from "../../../../Infrastructures/repository/UserRepositoryMysql";
import prisma from "../../../../Infrastructures/database/mysql/mysql";
import bcrypt from 'bcrypt'
import BcryptPasswordHash from "../../../../Infrastructures/security/BcryptPasswordHash";
import CategoryRepositoryMysql from "../../../../Infrastructures/repository/CategoryRepositoryMysql";
import OrganizationRepositoryMysql from "../../../../Infrastructures/repository/OrganizationRepositoryMysql";
import RoleRepositoryMysql from "../../../../Infrastructures/repository/RoleRepositoryMysql";
class UsersHandler {
  constructor(){

    this.postUserHandler = this.postUserHandler.bind(this)
  }

  async postUserHandler(req, res, next) {
    
    try {
      const userRepository = new UserRepositoryMysql(prisma);
      const passwordHash = new BcryptPasswordHash(bcrypt, 10);
      const categoryRepository = new CategoryRepositoryMysql(prisma);
      const organizationRepository = new OrganizationRepositoryMysql(prisma);
      const roleRepository = new RoleRepositoryMysql(prisma);
      const addUserUseCase = new AddUserUseCase({
        userRepository,
        passwordHash,
        categoryRepository,
        organizationRepository,
        roleRepository,
      });
      const addedUser = await addUserUseCase.execute(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          addedUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersHandler;
