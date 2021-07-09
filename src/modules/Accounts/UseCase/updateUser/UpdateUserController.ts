import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "../updateUser/UpdateUserUseCase";


class UpdateUserController{

    async handle(request: Request, response: Response): Promise<Response>{
        
        const data = request.body
        const user_id = request.userId
        
        const updateUserUseCase = container.resolve(UpdateUserUseCase)

        const all = await updateUserUseCase.execute(data, user_id)

        return response.status(200).json(all)


    }


}


export { UpdateUserController }