import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
require('dotenv').config()
import { ISessionsRepository } from "@modules/Accounts/Repositories/ISessionRepository";
import auth from "config/auth";
import { IUsersTokenRepository } from "@modules/Accounts/Repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/IDateProvider";

interface IRequestDTO {
  email: string,
  passwd: string
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string
  refresh_token: string
}


@injectable()
class AutenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository,
    @inject("SessionsRepository")
    private sessionsRepository: ISessionsRepository,
    @inject("UsersTokenRepository")
    private usersTokensRepository: IUsersTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
  ) { }


  async execute({ email, passwd }: IRequestDTO): Promise<IResponse> {


    //Verificando se o usuário existe;
    const user = await this.userRepository.findbyEmail(
      email
    );

    //Se não existir, retorna resposta de erro
    if (!user) {
      throw new AppError("User does not exist", 404)
    }

    //Comparando a senha que usuário inseriu com a existente no banco
    const isValidPasswd = await compare(passwd, user.passwd);

    //Se não forem iguais, retorna resposta de erro
    if (!isValidPasswd) {
      throw new AppError("User or password incorrect!")
    }

    //Gerando token apartir do id do usuário, usando a chave de encriptação, token com validade de 1 dia;
    const token = sign({ id: user.user_id }, process.env.API_SECRET, { expiresIn: auth.expires_in_token })

    await this.sessionsRepository.createSession(user.user_id)

    const refresh_token = sign({ email }, process.env.API_SECRET_REFRESH_TOKEN, {
      subject: user.user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.user_id,
      refresh_token,
      expires_date: refresh_token_expires_date
    })

    /// TIPAGEM
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.username,
        email: user.email
      },
      refresh_token
    }

    return tokenReturn

  }
}


export { AutenticateUserUseCase }


