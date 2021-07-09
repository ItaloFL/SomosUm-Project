import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";


class ListUsersController{

 async handle(request: Request, response: Response): Promise<Response>{

   const { user_id } = request.params

   const listUserUseCase = container.resolve(ListUsersUseCase)

   const allUsers = await listUserUseCase.execute(user_id)

   return response.status(200).json(allUsers)
     
 }

}



export { ListUsersController }