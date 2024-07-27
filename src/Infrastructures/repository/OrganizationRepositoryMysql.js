const OrganizationRepository = require("../../Domains/organization/OrganizationRepository");
const AddedOrganization = require("../../Domains/organization/entities/AddedOrganization");
const InvariantError = require("../../Commons/InvariantError");

class OrganizationRepositoryMysql extends OrganizationRepository{

  constructor(prisma){
    super();
    this._prisma = prisma
  }

  async createOrganization(organization) {
    const { name, user_id, category_id } = organization
    const newOrganization = await this._prisma.organization.create({
      data: { name, user_id, category_id }
    })
    return new AddedOrganization(newOrganization)
  }
}
module.exports = OrganizationRepositoryMysql