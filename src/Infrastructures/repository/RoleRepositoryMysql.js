const InvariantError = require("../../Commons/InvariantError");
const RoleRepository = require("../../Domains/role/RoleRepository");
const AddedRole = require("../../Domains/role/entities/AddedRole");
const GetRole = require("../../Domains/role/entities/GetRole");

class RoleRepositoryMysql extends RoleRepository {
    constructor(prisma){
        super();
        this._prisma = prisma;
    }
    async addRole(role){
        const { name } = role;
        const newRole = await this._prisma.role.create({
            data: { name },
        });
        return new AddedRole(newRole);
    }
    async verifyAvailableRole(name){
        const role = await this._prisma.role.findFirst({
            where: { name },
        })
        if(role){
            throw new InvariantError("ROLE_NAME_ALREADY_EXISTS");
        }
    }
    async findRoleById(roleId){
        const role = await this._prisma.role.findFirst({
            where: { id: roleId },
        });
        if(!role){
            throw new InvariantError("ROLE_NOT_FOUND");
        }
    }
    async getAllRole(){
        const roles = await this._prisma.role.findMany();
        return roles.map((role) => new GetRole(
            {
                id: role.id,
                name: role.name,
                createdAt: (role.createdAt).toString(),
                updatedAt: (role.updatedAt).toString(),
            }
        ));
    }
}
module.exports = RoleRepositoryMysql;