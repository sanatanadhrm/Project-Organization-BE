const AddRole = require("../../Domains/role/entities/AddRole");



class AddRoleUseCase { 
    constructor({roleRepository}) {
        this._roleRepository = roleRepository;
    }
    async execute(useCasePayload) {
        const addRole = new AddRole(useCasePayload);
        console.log(useCasePayload,'a3s');
        await this._roleRepository.verifyAvailableRole(addRole.name);
        console.log(useCasePayload,'a4s');
        return this._roleRepository.addRole(addRole);
    }
}
module.exports = AddRoleUseCase;