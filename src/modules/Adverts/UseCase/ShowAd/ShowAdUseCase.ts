import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IViewsRepository } from "@modules/Adverts/Repositories/IViewsRepository";
import { IAnunciosRepository } from "@modules/Adverts/Repositories/IAnunciosRepository";
import { IShowAdDTO } from "@modules/Adverts/dtos/IShowAdDTO";

@injectable()
class ShowAdUseCase{
  constructor (
    @inject("AnunciosRepository") private adRepository: IAnunciosRepository,
    @inject("ViewRepository") private viewRepository: IViewsRepository) {}

  async execute(ad_id: string, user_id: string): Promise<IShowAdDTO> {
    if (!ad_id) {
      throw new AppError("Id de anúncio faltando!")
    }

    const adInfo = await this.adRepository.showAd(ad_id, user_id)

    this.viewRepository.countView(ad_id, user_id)

    return adInfo
  }
}

export {ShowAdUseCase}