import { ICreateAdDTO } from "@modules/Adverts/dtos/ICreateAdDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAdUseCase } from "./CreateAdUseCase";

class CreateAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateAdDTO = request.body
    const user_id = request.userId

    const createAdUseCase = container.resolve(CreateAdUseCase);

    const ad = await createAdUseCase.execute( data, user_id );

    return response.status(201).json(ad);
  }
}

export { CreateAdController };