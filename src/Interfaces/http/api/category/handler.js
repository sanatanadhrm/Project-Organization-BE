const AddCategoryUseCase =  require("../../../../Applications/usecase/AddCategoryUseCase");
const CategoryRepositoryMysql = require("../../../../Infrastructures/repository/CategoryRepositoryMysql");
const prisma = require("../../../../Infrastructures/database/mysql/mysql");

class CategoryHandler{
    constructor(){
        this.postCategoryHandler = this.postCategoryHandler.bind(this)
    }
    async postCategoryHandler(req, res, next) {
        try{
            const categoryRepository = new CategoryRepositoryMysql(prisma)
            const newCategoryUseCase = new AddCategoryUseCase({
                categoryRepository
            })
            const newCategory = await newCategoryUseCase.execute(req.body)
            res.status(201).json({
                status: 'success',
                data: newCategory
            })
        }catch(error){
            next(error);
        }

    }
}
module.exports = CategoryHandler;
