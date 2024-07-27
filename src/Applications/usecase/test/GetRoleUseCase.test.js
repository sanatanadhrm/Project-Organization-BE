const GetRole = require("../../../Domains/role/entities/GetRole");
const RoleRepository = require("../../../Domains/role/RoleRepository");
const GetRoleUseCase = require("../GetRoleUseCase");

describe('GetRoleUseCase', () => {
    it('should orchestrating the get role action correctly', async () => {
        // Arrange
        const mockRoleRepository = new RoleRepository();
        mockRoleRepository.getAllRole = jest.fn()
            .mockImplementation(() => Promise.resolve([
                {
                    id: 1,
                    name: 'admin',
                    createdAt: "2021-08-08T07:22:33.555Z",
                    updatedAt: "2021-08-08T07:22:33.555Z",

                }
            ]));
        const getRoleUseCase = new GetRoleUseCase({
            roleRepository: mockRoleRepository
        });

        // Action
        const roles = await getRoleUseCase.execute();

        // Assert
        expect(roles).toStrictEqual([
            new GetRole({
                id: 1,
                name: 'admin',
                createdAt: "2021-08-08T07:22:33.555Z",
                updatedAt: "2021-08-08T07:22:33.555Z",
            })
        ]);
    });
});