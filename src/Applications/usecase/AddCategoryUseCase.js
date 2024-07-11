import NewCategory from "../../Domains/category/entities/NewCategory";

class AddCategoryUseCase {
    constructor({ categoryRepository }) {
        this._categoryRepository = categoryRepository;
    }

    async execute(useCasePayload) {
        const addedCategory = new NewCategory(useCasePayload);
        await this._categoryRepository.verifyCategoryName(addedCategory.name);
        return this._categoryRepository.addCategory(addedCategory);
    }
}
export default AddCategoryUseCase;