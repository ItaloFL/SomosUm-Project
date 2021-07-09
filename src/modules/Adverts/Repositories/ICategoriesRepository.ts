import { Categorie } from "../infra/typeorm/entities/Categorie";


interface ICategoriesRepository {
  create(categorieName: string): Promise<Categorie>
  delete(categorieID: string) : Promise<void>
  findById(ad_id: string): Promise<Categorie>
  listCategories(): Promise<Categorie[]>
}

export { ICategoriesRepository }