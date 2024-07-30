const prisma = require("../../../../Infrastructures/database/mysql/mysql");
const OrganizationRepositoryMysql = require("../../../../Infrastructures/repository/OrganizationRepositoryMysql");
const CategoryRepositoryMysql = require("../../../../Infrastructures/repository/CategoryRepositoryMysql");
const GetOrganizationUseCase = require("../../../../Applications/usecase/GetOrganizationUseCase");

class OrganizationHandler {
    constructor(){
        this.getOrganizationHandler = this.getOrganizationHandler.bind(this);
    }

    async getOrganizationHandler(req, res, next) {
        try {
            
            const organizationRepository = new OrganizationRepositoryMysql(prisma);
            
            const categoryRepository = new CategoryRepositoryMysql(prisma);
            
            const getOrganizationUseCase = new GetOrganizationUseCase({
                organizationRepository,
                categoryRepository
            });
            
            const organizations = await getOrganizationUseCase.execute();
            return res.status(200).json({
                status: 'success',
                data: organizations,
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = OrganizationHandler;