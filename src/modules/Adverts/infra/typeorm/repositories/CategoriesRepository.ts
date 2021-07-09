import { Repository, getRepository,} from "typeorm"

import { ICategoriesRepository } from "@modules/Adverts/Repositories/ICategoriesRepository";
import { Categorie } from "../entities/Categorie"

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Categorie> 

  constructor() {
    this.repository = getRepository(Categorie);
  }

  async create(categorieName: string): Promise<Categorie> {
    const category = this.repository.create({
      categorieName
    })

    await this.repository.save(category);

    return category;
  }

  async delete(categorieID: string): Promise<void> {
    await this.repository.delete(categorieID)
  }

  async findById(ad_id: string): Promise<Categorie> {
  
    return await this.repository.findOne(ad_id);
  }

  async listCategories(): Promise<Categorie[]> {
    const Categorieslist = await this.repository.find()

    return Categorieslist
  }
}

export { CategoriesRepository }