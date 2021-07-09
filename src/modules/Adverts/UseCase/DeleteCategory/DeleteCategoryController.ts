import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";


class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { categorieID }  = request.params;

    const deleteCategoryController = container.resolve(DeleteCategoryUseCase);

    await deleteCategoryController.execute(categorieID);

    return response.status(204);
  }
}

export { DeleteCategoryController };