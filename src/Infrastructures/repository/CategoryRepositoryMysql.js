const InvariantError = require("../../Commons/InvariantError");
const CategoryRepository = require("../../Domains/category/CategoryRepository");
const AddedCategory = require("../../Domains/category/entities/AddedCategory");
const GetCategory = require("../../Domains/category/entities/GetCategory");

class CategoryRepositoryMysql extends CategoryRepository {
  constructor(prisma) {
    super();
    this._prisma = prisma;
  }

  async addCategory(category) {
    const { name } = category;
    const newCategory = await this._prisma.category.create({
      data: { name },
    });
    return new AddedCategory(newCategory);
  }

  async verifyCategoryName(name) {
    const category = await this._prisma.category.findFirst({
      where: { name },
    });
    if (category) {
      throw new InvariantError("CATEGORY_NAME_ALREADY_EXISTS");
    }
  }

  async getCategory() {
    const categories = await this._prisma.category.findMany();
    return categories.map((category) => new GetCategory(category));
  }

  async findCategoryById(id) {
    const category = await this._prisma.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new InvariantError("CATEGORY_ID_NOT_FOUND");
    }
  }
}

module.exports = CategoryRepositoryMysql;
