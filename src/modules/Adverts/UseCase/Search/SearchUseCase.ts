import { inject, injectable } from "tsyringe";

import { Anuncio } from "@modules/Adverts/infra/typeorm/entities/Anuncio";
import { IAnunciosRepository } from "@modules/Adverts/Repositories/IAnunciosRepository";
import { ISearchParamsDTO } from "@modules/Adverts/dtos/ISearchParamsDTO";


@injectable()
class SearchUseCase{
  constructor (
    @inject("AnunciosRepository")
    private adRepository: IAnunciosRepository) {}

  async execute(data : ISearchParamsDTO): Promise<Anuncio[]> {
    const category = this.adRepository.search(data)

    return category;
  }
}

export { SearchUseCase }