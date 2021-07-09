import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../Repositories/IUserRepository";


@injectable()
class UpdateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ){}

    async execute(info: ICreateUserDTO, user_id: string){
    

      if(!info.username || !info.whatsapp || !info.church || !info.data_nascimento ){
        throw new AppError("Campo obrigatório não preenchido!")
      }
    
      var user = await this.userRepository.findbyId(user_id)

      if(!user){
        throw new AppError("Usuário não encontrado")
      }
    

      const updatedUser = await this.userRepository.updateUser(info, user_id)

      return updatedUser
    
  };

}





export { UpdateUserUseCase }