import { Request, Response } from "express";
import { container } from "tsyringe";

import { CompareCodeUseCase } from "./CompareCodeUseCase";

class CompareCodeController{
  async handle(request:Request, response:Response): Promise<Response>{
    const { code } = request.body
    const { authorization } = request.headers
    
    const compareCodeUseCase = container.resolve(CompareCodeUseCase)

    await compareCodeUseCase.execute(code, authorization);
    
    return response.sendStatus(200);
  }
}

export {CompareCodeController}