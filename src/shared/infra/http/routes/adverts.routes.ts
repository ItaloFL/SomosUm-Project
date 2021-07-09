import { Router } from 'express'

import { authMiddleware } from '../middlewares/authMiddlewares';

import { SearchController } from '@modules/Adverts/UseCase/Search/SearchController'
import { CreateAdController } from '@modules/Adverts/UseCase/CreateAd/CreateAdController'
import { DeleteAdController } from '@modules/Adverts/UseCase/DeleteAd/DeleteAdController'
import { ListAdsByCategorieController } from '@modules/Adverts/UseCase/ListAdsByCategorie/ListAdsByCategorieController'
import { ListAdsByUserController } from '@modules/Adverts/UseCase/ListAdsByUser/ListAdsByUserController'
import { ShowAdController } from '@modules/Adverts/UseCase/ShowAd/ShowAdController' 
import { UpdateAdController } from '@modules/Adverts/UseCase/UpdateAd/UpdateAdController'

const AdvertsRoutes = Router()

const listAdsByCategoriesController = new ListAdsByCategorieController()
const listAdsByUserController = new ListAdsByUserController()
const showAdController = new ShowAdController()
const createAdController = new CreateAdController()
const updateAdController = new UpdateAdController()
const deleteAdController = new DeleteAdController()
const searchController = new SearchController()


AdvertsRoutes.get("/listAdsByCategorie", authMiddleware, listAdsByCategoriesController.handle);//listar anuncios por categoria
AdvertsRoutes.get("/listAdsByUser", authMiddleware, listAdsByUserController.handle);//listar anuncios por usuario
AdvertsRoutes.post("/ad", authMiddleware, createAdController.handle);//criar anuncio
AdvertsRoutes.get("/showAd/:ad_id", authMiddleware, showAdController.handle);//Mostrar anuncio
AdvertsRoutes.put("/updateAd", authMiddleware, updateAdController.handle);//Atualizar anuncio
AdvertsRoutes.delete("/deletead/:ad_id", authMiddleware, deleteAdController.handle)//deletar anuncio
AdvertsRoutes.get("/search/:ad_name/:categorieID", authMiddleware, searchController.handle);//Barra de pesquisa


export { AdvertsRoutes }
