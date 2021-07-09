import { injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { CompareHash } from "@utils/CompareHash";

@injectable()
class CompareCodeUseCase{
  async execute(code: string, auth: string): Promise<void>{
    if (!code){
      throw new AppError("Insira o código!", 404)
    }else if (!auth){
      throw new AppError("Token Missing!", 401)
    }

    const [, token] = auth.split(" ");

    const isValid = await CompareHash(code, token);
    
    if ( !isValid ) {
      throw new AppError("Invalid Code!", 401)
    }
  }
}

export {CompareCodeUseCase}