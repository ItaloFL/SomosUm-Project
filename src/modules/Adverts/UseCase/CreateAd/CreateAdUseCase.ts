import { inject, injectable } from "tsyringe";
import { IAnunciosRepository } from "../../Repositories/IAnunciosRepository";
import { AppError } from "@shared/errors/AppError"
import { Anuncio } from "../../infra/typeorm/entities/Anuncio";
import { ICreateAdDTO } from "../../dtos/ICreateAdDTO";


@injectable()
class CreateAdUseCase{
  constructor (@inject("AnunciosRepository") private adRepository: IAnunciosRepository) {}

  async execute({
    ad_name, price,
    price_type, photos,
    description, categorieID
  }: ICreateAdDTO, user_id: string): Promise<Anuncio> {
    if (!ad_name || !description) {
      throw new AppError("Campo obrigatório não preenchido!")
    }

    const ad = this.adRepository.create({
      ad_name,
      price,
      price_type,
      description,
      categorieID,
      photos,
    }, user_id)

    return ad;

  }
}

export { CreateAdUseCase }