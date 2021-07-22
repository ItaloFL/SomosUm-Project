import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { IUpdateUserDTO } from "@modules/Accounts/dtos/IUpdateUserDTO";


@injectable()
class UpdateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(info: IUpdateUserDTO, user_id: string) {


    if (!info.username || !info.whatsapp || !info.church || !info.data_nascimento) {
      throw new AppError("Missing field!")
    }

    var user = await this.userRepository.findbyId(user_id)

    if (!user) {
      throw new AppError("User not found", 404)
    }


    const updatedUser = await this.userRepository.updateUser(info, user_id)

    return updatedUser

  };

}


export { UpdateUserUseCase }