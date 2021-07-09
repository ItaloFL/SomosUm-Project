import { Anuncio } from "@modules/Adverts/infra/typeorm/entities/Anuncio";
import { IAnunciosRepository } from "@modules/Adverts/Repositories/IAnunciosRepository";
import { ICategoriesRepository } from "@modules/Adverts/Repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAdsByCategorieUseCase {
  constructor ( 
    @inject("AnunciosRepository")
    private adRepository: IAnunciosRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ) {}

  async execute(categorieID: string): Promise<Anuncio[]> {
    const categoryExist = await this.categoriesRepository.findById(categorieID)
    if ( !categoryExist ) {
      throw new AppError("Categoria não encontrada.")
    }

    const adList = await this.adRepository.listByCategorie(categorieID) 

    return adList;
  }
}

export { ListAdsByCategorieUseCase }