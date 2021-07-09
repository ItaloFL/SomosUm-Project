import { ICategoriesRepository } from "@modules/Adverts/Repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteCategoryUseCase {
  constructor (
    @inject("CategoriesRepository") 
    private categoryRepository: ICategoriesRepository) {}

  async execute(categorieID: string): Promise<void> {
    const categoryExist = await this.categoryRepository.findById(categorieID)

    if (!categoryExist){
      throw new AppError("Categoria não encontrada!")
    }

    await this.categoryRepository.delete(categorieID)
  }
}

export { DeleteCategoryUseCase }