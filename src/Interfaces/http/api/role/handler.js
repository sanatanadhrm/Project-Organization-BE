import AddRoleUseCase from "../../../../Applications/usecase/AddRoleUseCase";
import RoleRepositoryMysql from "../../../../Infrastructures/repository/RoleRepositoryMysql";
import prisma from "../../../../Infrastructures/database/mysql/mysql";

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
export default RoleHandler;