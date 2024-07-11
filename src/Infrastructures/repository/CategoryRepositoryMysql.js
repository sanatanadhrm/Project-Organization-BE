import InvariantError from "../../Commons/InvariantError";
import CategoryRepository from "../../Domains/category/CategoryRepository";
import AddedCategory from "../../Domains/category/entities/AddedCategory";

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

  async findCategoryById(id) {
    const category = await this._prisma.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new InvariantError("CATEGORY_ID_NOT_FOUND");
    }
  }
}

export default CategoryRepositoryMysql;
