const GetCategory = require("../../../Domains/category/entities/GetCategory");
const GetOrganization = require("../../../Domains/organization/entities/GetOrganization");
const CategoryRepository = require("../../../Domains/category/CategoryRepository");
const OrganizationRepository = require("../../../Domains/organization/OrganizationRepository");
const GetOrganizationUseCase = require("../GetOrganizationUseCase");
const { category } = require("../../../Infrastructures/database/mysql/mysql");

describe('GetOrganizationUseCase', () => {
    it('should orchestrating the get organization action correctly', async () => {
        // Arrange
        const expectedOrganizations = [
            {
                id: 1,
                name: 'dicoding',
                user_id: 1,
                category_id: 1,
                createdAt: "28 September 2021",
                updatedAt: "28 September 2021"
            }
        ];
        const expectedCategories = [
            {
                id: 1,
                name: 'sports'
            }
        ];
        

        /** creating dependency of use case */
        const mockOrganizationRepository = new OrganizationRepository();
        const mockCategoryRepository = new CategoryRepository();

        /** mocking needed function */
        mockOrganizationRepository.getAllOrganization = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedOrganizations.map(org => new GetOrganization(org))))
        mockCategoryRepository.getCategory = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedCategories.map(cat => new GetCategory(cat))))

        /** creating use case instance */
        const getOrganizationUseCase = new GetOrganizationUseCase({
            organizationRepository: mockOrganizationRepository,
            categoryRepository: mockCategoryRepository
        });

        // Action
        const organization = await getOrganizationUseCase.execute();
        const result = expectedOrganizations.map(org => ({
            ...org,
            category: expectedCategories.find(cat => cat.id === org.category_id)
        }));

        // Assert
        expect(organization).toStrictEqual(result);
        expect(mockOrganizationRepository.getAllOrganization).toHaveBeenCalled();
        expect(mockCategoryRepository.getCategory).toHaveBeenCalled();
    });
});