const GetCategoryUseCase = require("../GetCategoryUseCase");
const CategoryRepository = require("../../../Domains/category/CategoryRepository");
const GetCategory = require("../../../Domains/category/entities/GetCategory");

describe('GetCategoryUseCase', () => {
    it('should orchestrating the get category action correctly', async () => {
        // Arrange
        const expectedCategory = [
            new GetCategory({
                id: 1,
                name: 'sports'
            })
        ];

        /** creating dependency of use case */
        const mockCategoryRepository = new CategoryRepository();

        /** mocking needed function */
        mockCategoryRepository.getCategory = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedCategory));

        /** creating use case instance */
        const getCategoryUseCase = new GetCategoryUseCase({
            categoryRepository: mockCategoryRepository
        });

        // Action
        const category = await getCategoryUseCase.execute();

        // Assert
        expect(category).toStrictEqual(expectedCategory);
        expect(mockCategoryRepository.getCategory).toHaveBeenCalled();
    });
});