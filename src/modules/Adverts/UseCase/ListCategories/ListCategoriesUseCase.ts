import { inject, injectable } from "tsyringe";

import { Categorie } from "../../infra/typeorm/entities/Categorie";
import { ICategoriesRepository } from "../../Repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase{
  constructor (
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Categorie[]> {
    const category = this.categoriesRepository.listCategories()

    return category;
  }
}

export { ListCategoriesUseCase }