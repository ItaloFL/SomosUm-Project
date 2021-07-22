import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowAdUseCase } from "./ShowAdUseCase";

class ShowAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.userId
    const { ad_id }  = request.params;

    const showAdUseCase = container.resolve(ShowAdUseCase);

    const adInfo = await showAdUseCase.execute(ad_id, user_id);

    return response.status(200).json(adInfo);
  }
}

export { ShowAdController };