import OrganizationRepository from "../../Domains/organization/OrganizationRepository"
import AddedOrganization from "../../Domains/organization/entities/AddedOrganization"
import InvariantError from "../../Commons/InvariantError"

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
export default OrganizationRepositoryMysql