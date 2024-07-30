const GetCategory = require("../../Domains/category/entities/GetCategory");
const GetOrganization = require("../../Domains/organization/entities/GetOrganization");

class GetOrganizationUseCase {
    constructor({ organizationRepository, categoryRepository }) {
        this._organizationRepository = organizationRepository;
        this._categoryRepository = categoryRepository;
    }

    async execute() {
        console.log("masukkkkk")
        const organizations = await this._organizationRepository.getAllOrganization();
        const categories = await this._categoryRepository.getCategory();
        console.log("masukkkkk")
        const result = organizations.map((org) => {
            const { id, name, user_id, category_id, createdAt, updatedAt } = new GetOrganization(org);
            const {id: idCategory, name: nameCategory} = new GetCategory(categories.find((cat) => cat.id === category_id));
            
            return { id, name, user_id, category_id, createdAt, updatedAt, category: {
                id: idCategory,
                name: nameCategory
            } };
        });
        console.log(result);

        return result;
    }
}

module.exports = GetOrganizationUseCase;
