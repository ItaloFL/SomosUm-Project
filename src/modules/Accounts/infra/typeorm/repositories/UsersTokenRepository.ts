import { IUsersTokensDTO } from "@modules/Accounts/dtos/IUsersTokensDTO";
import { IUsersTokenRepository } from "@modules/Accounts/Repositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import { UsersToken } from "../entities/UsersToken";




export class UsersTokensRepository implements IUsersTokenRepository{
  
  private repository: Repository<UsersToken>

  constructor(){
    this.repository = getRepository(UsersToken)
  }
  
  async create({ user_id, expires_date, refresh_token }: IUsersTokensDTO): Promise<UsersToken> {
    
    const userToken =  this.repository.create({
      user_id,
      expires_date,
      refresh_token
    })

    await this.repository.save(userToken)

    return userToken;
  }

  async findByIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
    return await this.repository.findOne({
      user_id,
      refresh_token
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
  
  

  
}