const AddRoleUseCase = require("../../../../Applications/usecase/AddRoleUseCase");
const RoleRepositoryMysql = require("../../../../Infrastructures/repository/RoleRepositoryMysql");
const prisma = require("../../../../Infrastructures/database/mysql/mysql");


class RoleHandler {
    constructor(){
        this.postRoleHandler = this.postRoleHandler.bind(this);
    }
    async postRoleHandler(req, res, next){
        try {
           
            const roleRepository = new RoleRepositoryMysql(prisma);
            const addRoleUseCase = new AddRoleUseCase({
                roleRepository
            });
            console.log(req.body,'as');
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