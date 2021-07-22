import { IUsersTokensDTO } from "../dtos/IUsersTokensDTO";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";


interface IUsersTokenRepository{

  create({user_id, expires_date, refresh_token}: IUsersTokensDTO): Promise<UsersToken>
  findByIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken>
  deleteById(id: string): Promise<void>

}

export { IUsersTokenRepository }