import AddedCategory from "../../../Domains/category/entities/AddedCategory";
import CategoryRepository from "../../../Domains/category/CategoryRepository";
import AddCategoryUseCase from "../AddCategoryUseCase";
import NewCategory from "../../../Domains/category/entities/NewCategory";

describe('AddCategoryUseCase', () => {
    it('should orchestrating the add category action correctly', async () => {
        // Arrange
        const useCasePayload = {
            name: 'sports'
        };
        const expectedAddedCategory = new AddedCategory({
            id: 1,
            name: useCasePayload.name
        });

        /** creating dependency of use case */
        const mockCategoryRepository = new CategoryRepository();

        /** mocking needed function */
        mockCategoryRepository.addCategory = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedAddedCategory));
        mockCategoryRepository.verifyCategoryName = jest.fn()
            .mockImplementation(() => Promise.resolve());

        /** creating use case instance */
        const addCategoryUseCase = new AddCategoryUseCase({
            categoryRepository: mockCategoryRepository
        });

        // Action
        const addedCategory = await addCategoryUseCase.execute(useCasePayload);

        // Assert
        expect(addedCategory).toStrictEqual(expectedAddedCategory);
        expect(mockCategoryRepository.verifyCategoryName).toBeCalledWith(useCasePayload.name);
        expect(mockCategoryRepository.addCategory).toBeCalledWith(new NewCategory(useCasePayload));
    });
});