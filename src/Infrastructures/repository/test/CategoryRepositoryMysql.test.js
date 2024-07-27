const AddedCategory = require("../../../Domains/category/entities/AddedCategory");
const mysql = require('../../../Infrastructures/database/mysql/mysql');
const CategoryTableHelper = require("../../../lib/CategoryTableHelper");
const CategoryRepositoryMysql = require("../CategoryRepositoryMysql");
const InvariantError = require("../../../Commons/InvariantError");

describe('CategoryRepositoryMysql', () => {
  beforeEach(async () => {
    await CategoryTableHelper.cleanTable();
  });
  afterEach(async () => {
    await CategoryTableHelper.cleanTable();
    });

  afterAll(async () => {
    await mysql.$disconnect();
  });

  describe('addCategory function', () => {
    it('should add category to database and return added category correctly', async () => {
      // Arrange
      const newCategory = {
        name: 'sports'
      };
      const categoryRepository = new CategoryRepositoryMysql(mysql);
      // Action
      const addedCategory = await categoryRepository.addCategory(newCategory);

      // Assert
      expect(addedCategory).toStrictEqual(
        new AddedCategory({
          id: addedCategory.id,
          name: newCategory.name
        })
      );
    });
  });
  describe('verifyCategoryName function', () => {
    it('should throw InvariantError when category name is exists', async () => {
      // Arrange
      await CategoryTableHelper.addCategory({ name: 'sports' });
      const categoryRepository = new CategoryRepositoryMysql(mysql);

      // Action & Assert
      await expect(categoryRepository.verifyCategoryName('sports')).rejects.toThrow(InvariantError);
    });
    it('should not throw InvariantError when category name is not exists', async () => {
      // Arrange
      const categoryRepository = new CategoryRepositoryMysql(mysql);

      // Action & Assert
      await expect(categoryRepository.verifyCategoryName('sports')).resolves.not.toThrow(InvariantError);
    });
  });

  describe('findCategoryById function', () => {
    it('should throw InvariantError when category id is not exists', async () => {
      // Arrange
      const categoryRepository = new CategoryRepositoryMysql(mysql);

      // Action & Assert
      await expect(categoryRepository.findCategoryById(1)).rejects.toThrow(InvariantError);
    });
    it('should not throw InvariantError when category id is exists', async () => {
      // Arrange
      const { id } = await CategoryTableHelper.addCategory({ name: 'sports' });
      const categoryRepository = new CategoryRepositoryMysql(mysql);

      // Action & Assert
      await expect(categoryRepository.findCategoryById(id)).resolves.not.toThrow(InvariantError);
    });
  });
});
