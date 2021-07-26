import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSubscriptionUseCase } from "./CreateSubscriptionUseCase";


class CreateSubscriptionController {

  async handle(request: Request, response: Response): Promise<Response> {

    const user_id = request.userId;

    const createSubscriptionUseCase = container.resolve(CreateSubscriptionUseCase)

    await createSubscriptionUseCase.execute(user_id)

    return response.status(201).send()
}
}


export { CreateSubscriptionController }