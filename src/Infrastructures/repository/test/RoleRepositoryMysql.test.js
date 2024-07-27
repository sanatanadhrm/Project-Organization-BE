const RoleRepositoryMysql = require("../RoleRepositoryMysql");
const mysql = require("../../database/mysql/mysql");
const RoleTableHelper = require("../../../lib/RoleTableHelper");
const InvariantError = require("../../../Commons/InvariantError");
const AddedRole = require("../../../Domains/role/entities/AddedRole");
const GetRole = require("../../../Domains/role/entities/GetRole");

describe('RoleRepositoryMysql', () => {
    beforeEach(async () => {
        await RoleTableHelper.cleanTable();
    });
    afterEach(async () => {
        await RoleTableHelper.cleanTable();
    });
    
    afterAll(async () => {
        await mysql.$disconnect();
    });
    
    describe('addRole function', () => {
        it('should add role to database and return added role correctly', async () => {
        // Arrange
        const newRole = {
            name: 'admin'
        };
        const roleRepository = new RoleRepositoryMysql(mysql);
        // Action
        const addedRole = await roleRepository.addRole(newRole);
    
        // Assert
        expect(addedRole).toStrictEqual(
            new AddedRole({
            id: addedRole.id,
            name: newRole.name
            })
        );
        });
    });
    describe('verifyAvailableRole function', () => {
        it('should throw InvariantError when role name is exists', async () => {
        // Arrange
        await RoleTableHelper.addRoleTable();
        const roleRepository = new RoleRepositoryMysql(mysql);
    
        // Action & Assert
        await expect(roleRepository.verifyAvailableRole('admin')).rejects.toThrow(InvariantError);
        });
        it('should not throw InvariantError when role name is not exists', async () => {
        // Arrange
        const roleRepository = new RoleRepositoryMysql(mysql);
    
        // Action & Assert
        await expect(roleRepository.verifyAvailableRole('admin')).resolves.not.toThrow(InvariantError);
        });
    });

    describe('findRoleById function', () => {
        it('should throw InvariantError when role id is not exists', async () => {
            // Arrange
            const roleRepository = new RoleRepositoryMysql(mysql);

            // Action & Assert
            await expect(roleRepository.findRoleById(1)).rejects.toThrow(InvariantError);
        });
        it('should not throw InvariantError when role id is exists', async () => {
            // Arrange
            await RoleTableHelper.addRoleTable();
            const roleRepository = new RoleRepositoryMysql(mysql);

            // Action & Assert
            await expect(roleRepository.findRoleById(1)).resolves.not.toThrow(InvariantError);
        });
    });
    
    describe('getAllRole function', () => {
        it('should return all roles correctly', async () => {
          // Arrange
          await RoleTableHelper.addRoleTable();
          const roleRepository = new RoleRepositoryMysql(mysql);
      
          // Action
          const roles = await roleRepository.getAllRole();
      
          // Assert
          expect(roles).toHaveLength(2);
          roles.forEach(role => {
            expect(role).toHaveProperty('id');
            expect(role).toHaveProperty('name');
            expect(role).toHaveProperty('createdAt');
            expect(role).toHaveProperty('updatedAt');
            expect(role).toStrictEqual(new GetRole({
              id: role.id,
              name: role.name,
              createdAt: role.createdAt,
              updatedAt: role.updatedAt,
            }));
          });
        });   
    });
});