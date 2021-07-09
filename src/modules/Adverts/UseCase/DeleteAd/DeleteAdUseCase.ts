import { IAnunciosRepository } from "@modules/Adverts/Repositories/IAnunciosRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteAdUseCase {
  constructor (
    @inject("AnunciosRepository")
    private adReository: IAnunciosRepository) {}

    async execute (ad_id: string): Promise<void>{
      const ad = await this.adReository.findById(ad_id)

      if(!ad) {
        throw new AppError("Anúncio não encontrado.")
      }
      await this.adReository.deleteAd(ad_id)

    }
  }

export { DeleteAdUseCase }