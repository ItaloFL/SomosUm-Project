import { User } from "@modules/Accounts/infra/typeorm/entities/User";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../Repositories/IUserRepository";


@injectable()
class ListUsersUseCase{
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ){}

  async execute(user_id: string): Promise<User[]>{
    const verify = await this.userRepository.verifyIsAdmin(user_id)

    if(!verify.isAdmin){
        throw new AppError("Ação não permitida")
    }

    const allUsers = await this.userRepository.list()

    return allUsers; 
  }
}





export { ListUsersUseCase }