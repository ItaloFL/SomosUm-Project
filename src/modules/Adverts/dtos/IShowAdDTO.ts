import { Anuncio } from "../infra/typeorm/entities/Anuncio";

export interface IShowAdDTO {
  adInfo: Anuncio,
  views: number
}
