import { Request, Response } from "express";
import { container } from "tsyringe";

import { SearchUseCase } from "./SearchUseCase";

class SearchController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ad_name, categorieID, user_id} = request.params
    
    const searchUseCase = container.resolve(SearchUseCase)

    const results = await searchUseCase.execute({ad_name, categorieID, user_id})

    return response.status(200).json(results)
  }
}

export { SearchController }