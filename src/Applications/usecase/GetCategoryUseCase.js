const GetCategory = require("../../Domains/category/entities/GetCategory");

class GetCategoryUseCase {
    constructor({ categoryRepository }) {
        this._categoryRepository = categoryRepository;
    }
    async execute() {
        const category = await this._categoryRepository.getCategory();
        return category.map((cat) => new GetCategory(cat));
    }
}
module.exports = GetCategoryUseCase;