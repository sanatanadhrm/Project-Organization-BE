const OrganizationRepositoryMysql = require("../OrganizationRepositoryMysql");
const OrganizationTableHelper = require("../../../lib/OrganizationTableHelper");
const mysql = require('../../../Infrastructures/database/mysql/mysql');
const AddedOrganization = require("../../../Domains/organization/entities/AddedOrganization");
const InvariantError = require("../../../Commons/InvariantError");
const UserTableHelper = require("../../../lib/UserTableHelper");
const RoleTableHelper = require("../../../lib/RoleTableHelper");
const CategoryTableHelper = require("../../../lib/CategoryTableHelper");
const GetOrganization = require("../../../Domains/organization/entities/GetOrganization");

describe('OrganizationRepositoryMysql', () => {
    beforeEach(async () => {
        await OrganizationTableHelper.cleanTable();
        await UserTableHelper.cleanTable();
        await RoleTableHelper.cleanTable();
        await CategoryTableHelper.cleanTable();
      });
      afterEach(async () => {
        await OrganizationTableHelper.cleanTable();
        await UserTableHelper.cleanTable();
        await RoleTableHelper.cleanTable();
        await CategoryTableHelper.cleanTable();
        });
    
      afterAll(async () => {
        await mysql.$disconnect();
      });

      describe('addCategory function', () => {
        it('should add category to database and return added category correctly', async () => {
          // Arrange
          const role = await RoleTableHelper.addRole({
            id: 2,
            name: 'Organization'
          });
          const user = await UserTableHelper.addUser({
            id: 1,
            role_id: role.id,
          });
          const category = await CategoryTableHelper.addCategory({
            id: 1,
            name: 'sports'
          });
          const mewOrganization = {
            name: user.name,
            user_id: user.id,
            category_id: category.id
          }
          const organizationRepository = new OrganizationRepositoryMysql(mysql);
            // Action
          const addedOrganization = await organizationRepository.createOrganization(mewOrganization);
          expect(addedOrganization).toStrictEqual(
            new AddedOrganization({
              id: addedOrganization.id,
              name: mewOrganization.name
            })
          );
        });
      });

      describe('getAllOrganization function', () => {
        it('should return all organizations correctly', async () => {
          const role = await RoleTableHelper.addRole({
            id: 2,
            name: 'Organization'
          });
          const user1 = await UserTableHelper.addUser({
              id: 1,
              email: 'silat@gmail.com',
              name: 'UKM Silat',
              role_id: role.id,
              password: 'password123'
          });
          const user2 = await UserTableHelper.addUser({
              id: 2,
              email: 'karate@gmail.com',
              name: 'UKM Karate',
              role_id: role.id,
              password: 'password123'
          });
          const category = await CategoryTableHelper.addCategory({
              id: 1,
              name: 'sports'
          });
          const newOrganization1 = {
              id: 1,
              name: 'UKM Silat',
              user_id: user1.id,
              category_id: category.id
          };
          const newOrganization2 = {
              id: 2,
              name: 'UKM Karate',
              user_id: user2.id,
              category_id: category.id
          };
          const organizationRepository = new OrganizationRepositoryMysql(mysql);
          await OrganizationTableHelper.addOrganization(newOrganization1);
          await OrganizationTableHelper.addOrganization(newOrganization2);

          // Action
          const organizations = await organizationRepository.getAllOrganization();

          // Assert
          expect(organizations).toHaveLength(2);
          expect(organizations).toStrictEqual([
              new GetOrganization({
                  id: newOrganization1.id,
                  name: newOrganization1.name,
                  user_id: 1,
                  category_id: 1,
                  createdAt: '2021-09-28T07:50:40.017Z',
                  updatedAt: '2021-09-28T07:50:40.017Z'
              }),
              new GetOrganization({
                  id: newOrganization2.id,
                  name: newOrganization2.name,
                  user_id: 2,
                  category_id: 1,
                  createdAt: '2021-09-28T07:50:40.017Z',
                  updatedAt: '2021-09-28T07:50:40.017Z'
              })
          ]);
      });
    });
});