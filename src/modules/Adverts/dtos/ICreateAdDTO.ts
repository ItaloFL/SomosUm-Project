export interface ICreateAdDTO {
  ad_id?: string,
  ad_name: string,
  price: string,
  price_type: boolean,
  photos?: [string],
  description: string,
  categorieID: string,
}
