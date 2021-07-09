import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError"
import { Categorie } from "../../infra/typeorm/entities/Categorie";
import { ICategoriesRepository } from "../../Repositories/ICategoriesRepository";

@injectable()
class CreateCategoryUseCase{
  constructor (
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {}

  async execute(categorieName: string): Promise<Categorie> {
    if (!categorieName) {
      throw new AppError("Campo obrigatório não preenchido!")
    }

    const categoryExists = await this.categoriesRepository.findById(
      categorieName
    );

    if (categoryExists) {
      throw new AppError("Categoria já existe")
    }

    const category = this.categoriesRepository.create(categorieName)

    return category;
  }
}

export { CreateCategoryUseCase }