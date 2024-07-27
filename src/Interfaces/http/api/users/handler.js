const AddUserUseCase = require("../../../../Applications/usecase/AddUserUseCase");
const UserRepositoryMysql = require("../../../../Infrastructures/repository/UserRepositoryMysql");
const prisma = require("../../../../Infrastructures/database/mysql/mysql");
const bcrypt = require('bcrypt');
const BcryptPasswordHash = require("../../../../Infrastructures/security/BcryptPasswordHash");
const CategoryRepositoryMysql = require("../../../../Infrastructures/repository/CategoryRepositoryMysql");
const OrganizationRepositoryMysql = require("../../../../Infrastructures/repository/OrganizationRepositoryMysql");
const RoleRepositoryMysql = require("../../../../Infrastructures/repository/RoleRepositoryMysql");

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
