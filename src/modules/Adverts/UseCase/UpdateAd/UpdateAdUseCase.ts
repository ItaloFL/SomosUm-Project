import { inject, injectable } from "tsyringe";
import { Anuncio } from "@modules/Adverts/infra/typeorm/entities/Anuncio";
import { AppError } from "@shared/errors/AppError";
import { IAnunciosRepository } from "../../Repositories/IAnunciosRepository";

@injectable()
class UpdateAdUseCase{
  constructor ( 
    @inject("AnunciosRepository")
    private adRepository: IAnunciosRepository,
    ) {}

  async execute({ 
    ad_name, price,
    price_type, photos,
    description, categorieID, ...data
  }: Anuncio): Promise<Anuncio> {
    const adExist = await this.adRepository.findById(data.ad_id)
    if (!adExist) {
      throw new AppError("Anúncio não encontrado", 404)
    }

    if (!ad_name || !price || !price_type || !photos || !description || !categorieID) {
      throw new AppError("Campo obrigatório não preenchido!")
    }
    const newAd = await this.adRepository.updateAd({ 
      ad_name, price,
      price_type, photos,
      description, categorieID, ...data
    })

    return newAd;
  }

}

export { UpdateAdUseCase }