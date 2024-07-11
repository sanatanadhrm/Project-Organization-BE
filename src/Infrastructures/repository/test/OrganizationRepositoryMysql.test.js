import OrganizationRepositoryMysql from "../OrganizationRepositoryMysql";
import OrganizationTableHelper from "../../../lib/OrganizationTableHelper";
import mysql from '../../../Infrastructures/database/mysql/mysql';
import AddedOrganization from "../../../Domains/organization/entities/AddedOrganization";
import InvariantError from "../../../Commons/InvariantError";
import UserTableHelper from "../../../lib/UserTableHelper";
import RoleTableHelper from "../../../lib/RoleTableHelper";
import CategoryTableHelper from "../../../lib/CategoryTableHelper";

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
});