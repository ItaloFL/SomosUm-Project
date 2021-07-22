import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "../../Repositories/IUserRepository";


@injectable()
class UserPerfilUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(user_id: string) {

    const userInfo = await this.userRepository.findbyId(
      user_id
    )

    if (!userInfo) {
      throw new AppError("User not found", 404)
    }

    delete userInfo.passwd;

    return userInfo


  }
}




export { UserPerfilUseCase }