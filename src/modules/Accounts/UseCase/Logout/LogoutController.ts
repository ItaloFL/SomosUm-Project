import { Request, Response } from "express";
import { container } from "tsyringe";
import { LogoutUseCase } from "./LogoutUseCase";

class LogoutController {
  async handle(request: Request, response: Response) {
    const user_id = request.userId
    const logoutUseCase = container.resolve(LogoutUseCase);

    await logoutUseCase.execute(user_id)

    return response.status(200)
  }
}

export { LogoutController }