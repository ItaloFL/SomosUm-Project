import { Repository, getRepository, Like, In} from "typeorm"

import { Anuncio } from "../entities/Anuncio"
import { User } from "@modules/Accounts/infra/typeorm/entities/User"

import { IAnunciosRepository } from "@modules/Adverts/Repositories/IAnunciosRepository"
import { IShowAdDTO } from "@modules/Adverts/dtos/IShowAdDTO"
import { ICreateAdDTO } from "@modules/Adverts/dtos/ICreateAdDTO"
import { ISearchParamsDTO } from "@modules/Adverts/dtos/ISearchParamsDTO"

class AnunciosRepository implements IAnunciosRepository {
  private repository: Repository<Anuncio>
  private userRepository: Repository<User>

  constructor() {
    this.repository = getRepository(Anuncio);
    this.userRepository = getRepository(User);
  }

  async create({
    ad_name, price,
    price_type, photos,
    description, categorieID
  }: ICreateAdDTO, user_id: string): Promise<Anuncio> {

    const ad = this.repository.create({
      ad_name,
      user_id,
      price,
      price_type,
      description,
      categorieID,
      photos,
    })

    await this.repository.save(ad);

    return ad;
  }


  async updateAd(data: Anuncio): Promise<Anuncio> {
    var newAd = await this.repository.findOne(data.ad_id);

    newAd = {...newAd,...data};

    await this.repository.save(newAd);

    return newAd;

  };

  async deleteAd(ad_id: string): Promise<void> {
    await this.repository.delete(ad_id);

    return
  }

  async listByCategorie(categorieID: string): Promise<Anuncio[]> {
    const list = await this.repository.find({
      where: { categorieID },
      order: {
        created_at: "DESC"
      }
    })
    
    return list;
  }

  async listByUser(user_id: string): Promise<Anuncio[]> {
    const adList = await this.repository.find({
      user_id
    })

    return adList
  }

  async showAd(ad_id: string, user_id: string): Promise<IShowAdDTO> {
    const adInfo = await this.repository.findOne({
      ad_id
    });

    const userInfo = await this.userRepository.findOne(user_id)

    const views = await this.repository
      .createQueryBuilder("views")
      .leftJoinAndSelect("views.user", "user")
      .where("user.church = :igreja", { igreja: userInfo.church })
      .andWhere("views.ad_id = :ad_id", { ad_id })
      .andWhere("views.user_id != :user_id", { user_id })
      .getCount();
    const data = { adInfo, views }

    return data
  }

  async findById(ad_id: string): Promise<Anuncio> { 
    return await this.repository.findOne(ad_id);
  }

  async search({ad_name, categorieID, user_id}: ISearchParamsDTO): Promise<Anuncio[]>{
    let param: object;
    if (categorieID){
      param = {categorieID: categorieID}
    }
    if (user_id) {
      param = {...param, user_id: user_id}
    }

    var data = await this.repository.find({
      where:{
        ad_name: Like(`%${ad_name}%`),
        ...param
      },
      select:[
        "ad_id",
        "ad_name",
        "price",
        "photos",
        "price_type"
      ]
    })
    return data;
  }
}

export { AnunciosRepository }