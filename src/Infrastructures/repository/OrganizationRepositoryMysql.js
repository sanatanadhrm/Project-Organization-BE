const OrganizationRepository = require("../../Domains/organization/OrganizationRepository");
const AddedOrganization = require("../../Domains/organization/entities/AddedOrganization");
const GetOrganization = require("../../Domains/organization/entities/GetOrganization");
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

  async getAllOrganization() {
    const organizations = await this._prisma.organization.findMany()
    return organizations.map(org => new GetOrganization({
      id: org.id,
      name: org.name,
      user_id: org.user_id,
      category_id: org.category_id,
      createdAt: (org.createdAt).toString(),
      updatedAt: (org.updatedAt).toString()
    }))
  }
}
module.exports = OrganizationRepositoryMysql