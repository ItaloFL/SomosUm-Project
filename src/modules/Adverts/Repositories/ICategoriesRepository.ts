import { Categorie } from "../infra/typeorm/entities/Categorie";


interface ICategoriesRepository {
  create(categorieName: string): Promise<Categorie>
  delete(categorieID: string) : Promise<void>
  findById(categorieID: string): Promise<Categorie>
  findByName(categorieName: string): Promise<Categorie>
  listCategories(): Promise<Categorie[]>
}

export { ICategoriesRepository }