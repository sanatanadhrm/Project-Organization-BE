import RoleRepository from "../RoleRepository";

describe("RoleRepository interface", () => {
    it("should throw error when invoke abstract behavior", async () => {
        // Arrange
        const roleRepository = new RoleRepository();

        // Action and Assert
        await expect(roleRepository.addRole({})).rejects.toThrow("ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
        await expect(roleRepository.verifyAvailableRole({})).rejects.toThrow("ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
        await expect(roleRepository.getAllRole()).rejects.toThrow("ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
        await expect(roleRepository.findRoleById({})).rejects.toThrow("ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    });
});