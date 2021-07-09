import { inject, injectable } from "tsyringe";

import { Anuncio } from "@modules/Adverts/infra/typeorm/entities/Anuncio";
import { IAnunciosRepository } from "@modules/Adverts/Repositories/IAnunciosRepository";

@injectable()
class ListAdsByUserUseCase {
  constructor ( 
    @inject("AnunciosRepository")
    private adRepository: IAnunciosRepository,
    ) {}

  async execute(userID: string): Promise<Anuncio[]> {
    const adList = await this.adRepository.listByUser(userID) 

    return adList;
  }
}

export { ListAdsByUserUseCase }