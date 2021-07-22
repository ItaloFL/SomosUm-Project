import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAdUseCase } from "./DeleteAdUseCase";


class DeleteAdController {

  async handle(request: Request, response: Response): Promise<Response>{
    const { ad_id } = request.params;

    const deleteAdUseCase = container.resolve(DeleteAdUseCase)

    await deleteAdUseCase.execute(ad_id);

    return response.sendStatus(204);
  }
}
export { DeleteAdController }