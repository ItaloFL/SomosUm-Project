import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAdsByCategorieUseCase } from "./ListAdsByCategorieUseCase";

class ListAdsByCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { categorieID } = request.params;

    const listByCategorieUseCase = container.resolve(ListAdsByCategorieUseCase);

    const adList = await listByCategorieUseCase.execute(categorieID);

    return response.status(200).json(adList);
  }
}

export { ListAdsByCategorieController }