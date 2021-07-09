import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAdsByUserUseCase } from "./ListAdsByUserUseCase";

class ListAdsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userID  = request.userId

    const listAdsByUserUseCase = container.resolve(ListAdsByUserUseCase);

    const adList = await listAdsByUserUseCase.execute(userID);

    return response.status(200).json(adList);
  } 
}

export { ListAdsByUserController }