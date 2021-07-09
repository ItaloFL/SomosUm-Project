import { ICreateAdDTO } from '../dtos/ICreateAdDTO'
import { Anuncio } from '../infra/typeorm/entities/Anuncio'
import { IShowAdDTO } from '../dtos/IShowAdDTO'
import { ISearchParamsDTO } from '../dtos/ISearchParamsDTO'

interface IAnunciosRepository {
  create(data : ICreateAdDTO, user_id: string): Promise<Anuncio>
  updateAd(info: Anuncio): Promise<Anuncio>
  deleteAd(ad_id: string): Promise<void>
  listByCategorie(categorieID: string): Promise<Anuncio[]>
  listByUser(user_id: string): Promise<Anuncio[]> 
  showAd(ad_id: string, user_id: string): Promise<IShowAdDTO>
  findById(id: string): Promise<Anuncio>
  search(data : ISearchParamsDTO): Promise<Anuncio[]>

}

export { IAnunciosRepository }