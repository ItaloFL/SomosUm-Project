import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserPerfilUseCase } from "../ShowUserPerfil/UserPerfilUseCase"


class UserPerfilController{


 async handle(request: Request, response: Response): Promise<Response>{
     
    const user_id = request.userId

    const userPerfilUseCase = container.resolve(UserPerfilUseCase)

    const perfil = await userPerfilUseCase.execute(
        user_id
    )

    return response.status(201).json(perfil)
 }

}


export { UserPerfilController }