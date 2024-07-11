import AddCategoryUseCase from "../../../../Applications/usecase/AddCategoryUseCase";
import CategoryRepositoryMysql from "../../../../Infrastructures/repository/CategoryRepositoryMysql";
import prisma from "../../../../Infrastructures/database/mysql/mysql";

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
export default CategoryHandler;
