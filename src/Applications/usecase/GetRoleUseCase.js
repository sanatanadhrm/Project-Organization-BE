const GetRole = require("../../Domains/role/entities/GetRole");

class GetRoleUseCase {
    constructor({ roleRepository }) {
        this._roleRepository = roleRepository;
    }
    async execute() {
        const role = await this._roleRepository.getAllRole();
        console.log(role,'masuk22');
        return role.map((rol) => new GetRole(rol));
    }
}
module.exports = GetRoleUseCase;