const AddCategoryUseCase =  require("../../../../Applications/usecase/AddCategoryUseCase");
const CategoryRepositoryMysql = require("../../../../Infrastructures/repository/CategoryRepositoryMysql");
const prisma = require("../../../../Infrastructures/database/mysql/mysql");
const GetCategoryUseCase = require("../../../../Applications/usecase/GetCategoryUseCase");

class CategoryHandler{
    constructor(){
        this.postCategoryHandler = this.postCategoryHandler.bind(this)
        this.getCategoryHandler = this.getCategoryHandler.bind(this)
    }
    async getCategoryHandler(req, res, next) {
        try{
            const categoryRepository = new CategoryRepositoryMysql(prisma)
            const getCategoryUseCase = new GetCategoryUseCase({
                categoryRepository
            })
            const categories = await getCategoryUseCase.execute()
            res.json({
                status: 'success',
                data: categories
            })
        }catch(error){
            next(error);
        }
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
