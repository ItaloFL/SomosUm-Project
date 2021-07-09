import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePassworldUseCase } from "./UpdatePasswordUseCase";

class UpdatePasswordController{
  async handle(request: Request, response: Response): Promise<Response>{

    const { newPasswd, newPasswdConfirm } = request.body
    const  user_id  = request.userId

    const updatePasswordUseCase = container.resolve(UpdatePassworldUseCase)


    await updatePasswordUseCase.execute(newPasswd, newPasswdConfirm, user_id);
    
    return response.sendStatus(200).json({
      message: "Senha alterada com sucesso"
    })
  }
}

export { UpdatePasswordController }