import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAdUseCase } from "./UpdateAdUseCase";

class UpdateAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const updateAdUseCase = container.resolve(UpdateAdUseCase);

    const newAd = await updateAdUseCase.execute(data);

    return response.status(200).json(newAd);
  }
}

export { UpdateAdController }