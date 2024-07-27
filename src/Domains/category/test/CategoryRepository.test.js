const CategoryRepository = require('../CategoryRepository')

describe('CategoryRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const categoryRepository = new CategoryRepository()

    // Action and Assert
    await expect(categoryRepository.addCategory({})).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(categoryRepository.verifyCategoryName('')).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(categoryRepository.findCategoryById('')).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  })
})