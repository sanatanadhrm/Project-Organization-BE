import RoleRepository from "../../../Domains/role/RoleRepository";
import AddRole from "../../../Domains/role/entities/AddRole";
import AddedRole from "../../../Domains/role/entities/AddedRole";
import AddRoleUseCase from "../AddRoleUseCase";

describe("AddRoleUseCase", () => {
    it("should orchestrating the add role action correctly", async () => {
        // Arrange
        const payload = {
            name: "admin",
        };

        const expectedAddedRole = new AddedRole({
            id: 1,
            name: payload.name,
        })

        const mockRoleRepository = new RoleRepository();
        mockRoleRepository.verifyAvailableRole = jest.fn().mockImplementation(() => Promise.resolve());
        mockRoleRepository.addRole = jest.fn().mockImplementation(() => Promise.resolve(expectedAddedRole));
        const addRoleUseCase = new AddRoleUseCase({
            roleRepository: mockRoleRepository,
        });

        // Action
        const AddedRoleUseCase = await addRoleUseCase.execute(payload);

        // Assert
        expect(AddedRoleUseCase).toStrictEqual(expectedAddedRole);
        expect(mockRoleRepository.verifyAvailableRole).toHaveBeenCalledWith(payload.name);
        expect(mockRoleRepository.addRole).toHaveBeenCalledWith(new AddRole(payload));
        

    });
});