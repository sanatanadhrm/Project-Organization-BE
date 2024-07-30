const AddRoleUseCase = require("../../../../Applications/usecase/AddRoleUseCase");
const RoleRepositoryMysql = require("../../../../Infrastructures/repository/RoleRepositoryMysql");
const prisma = require("../../../../Infrastructures/database/mysql/mysql");
const GetRoleUseCase = require("../../../../Applications/usecase/GetRoleUseCase");

class RoleHandler {
    constructor(){
        this.postRoleHandler = this.postRoleHandler.bind(this);
        this.getRoleHandler = this.getRoleHandler.bind(this);
    }

    async getRoleHandler(req, res, next){
        try {
            
            const roleRepository = new RoleRepositoryMysql(prisma);
            const getRoleUseCase = new GetRoleUseCase({
                roleRepository
            });
            const role = await getRoleUseCase.execute();
            res.status(200).json({
                status: 'success',
                data: role,
              });
        } catch (error) {
            next(error);
        }
    }

    async postRoleHandler(req, res, next){
        try {
           
            const roleRepository = new RoleRepositoryMysql(prisma);
            const addRoleUseCase = new AddRoleUseCase({
                roleRepository
            });
            const addedRole = await addRoleUseCase.execute(req.body);
            res.status(201).json({
                status: 'success',
                data: addedRole,
              });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = RoleHandler;