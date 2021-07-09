import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddlewares';
import { ListCategoriesController } from '@modules/Adverts/UseCase/ListCategories/ListCategoriesController'
import { CreateCategoryController } from '@modules/Adverts/UseCase/CreateCategory/CreateCategoryController'
import { DeleteCategoryController } from '@modules/Adverts/UseCase/DeleteCategory/DeleteCategoryController'

const CategoryRoutes = Router()

const createCategoryController = new CreateCategoryController()
const deleteCategoryController = new DeleteCategoryController()
const listCategoriesController = new ListCategoriesController()

CategoryRoutes.get("/listCategories/:categorieID", authMiddleware, listCategoriesController.handle );//listar categorias
CategoryRoutes.post("/Categories", authMiddleware, createCategoryController.handle);//Criar categoriar
CategoryRoutes.delete("/deletecatego/:categorieID", authMiddleware, deleteCategoryController.handle)//deletar categoria


export { CategoryRoutes }