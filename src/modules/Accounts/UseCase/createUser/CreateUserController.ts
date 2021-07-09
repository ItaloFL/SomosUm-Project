import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        const data = request.body

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute(data)

        return response.status(201).json({
            message: "User created successfully"
        })
    }


}


export { CreateUserController }