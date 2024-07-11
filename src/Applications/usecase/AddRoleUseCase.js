import AddRole from "../../Domains/role/entities/AddRole";


class AddRoleUseCase { 
    constructor({roleRepository}) {
        this._roleRepository = roleRepository;
    }
    async execute(useCasePayload) {
        const addRole = new AddRole(useCasePayload);
        await this._roleRepository.verifyAvailableRole(addRole.name);
        return this._roleRepository.addRole(addRole);
    }
}
export default AddRoleUseCase;