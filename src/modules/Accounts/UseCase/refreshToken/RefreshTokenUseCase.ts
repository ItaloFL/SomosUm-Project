import { IUsersTokenRepository } from "@modules/Accounts/Repositories/IUsersTokenRepository"
import { DateProvider } from "@shared/container/providers/implementations/DateProvider"
import { AppError } from "@shared/errors/AppError"
import auth from "config/auth"
require('dotenv').config()

import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayLoad{
  email: string
  sub: string
}

@injectable()
class RefreshTokenUseCase{

  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DateProvider")
    private dateProvider: DateProvider
  ){}

  async execute(token: string){

    const { email, sub } = verify(token, process.env.API_SECRET_REFRESH_TOKEN) as IPayLoad

    const user_id = sub

    const userToken = await this.usersTokenRepository.findByIdAndRefreshToken(
      user_id,
      token 
    )

    if(!userToken){
      throw new AppError("Refresh token não existe")
    }

    await this.usersTokenRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, process.env.API_SECRET_REFRESH_TOKEN,{
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = await this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokenRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    const newToken = sign({}, process.env.API_SECRET,{
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return {
      refresh_token,
      token: newToken
    }

  }

}

export { RefreshTokenUseCase }