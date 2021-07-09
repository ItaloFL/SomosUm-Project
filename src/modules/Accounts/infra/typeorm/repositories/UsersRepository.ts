import { Repository, getRepository,} from "typeorm"
import bcrypt from "bcryptjs"

import { User } from "../entities/User"
import { IUserRepository } from "@modules/Accounts/Repositories/IUserRepository"
import { ICreateUserDTO } from "@modules/Accounts/dtos/ICreateUserDTO"


class UsersRepository implements IUserRepository {
  private repository: Repository<User>

  constructor(){
    this.repository = getRepository(User)
  }
  
  async create(data: ICreateUserDTO): Promise<void> {
    
    const user = this.repository.create({...data})

    user.passwd = bcrypt.hashSync(user.passwd, 8)

    await this.repository.save(user)
  }

  async findbyEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email })

  }

  async findbyId(id: string): Promise<User>{
    return await this.repository.findOne(id)

  } 

  async findbyCPF(CPF: string): Promise<User> {
    return await this.repository.findOne(CPF);

  }

  async findbyCNPJ(CNPJ: string): Promise<User>{
    return await this.repository.findOne(CNPJ)

  }

  async updateUser(info: ICreateUserDTO, user_id: string): Promise<User>{
    let user = await this.repository.findOne({
      user_id
    })

    user = {...user, ...info}

    await this.repository.save(user)

    delete user.passwd

    return user;
  }

  async updatePassword(newPasswd: string, user_id: string): Promise<void> {
    const user = await this.repository.findOne({
      user_id,
    });

    user.passwd = bcrypt.hashSync(newPasswd, 8);

    await this.repository.save( user );
  }

  async list(): Promise<User[]> {
    return await this.repository.find()
  }

  async verifyIsAdmin(user_id: string): Promise<User>{

    return await this.repository.findOne({
      where: {user_id},
      select: [
        "isAdmin"
      ]
    })
  }
  
}

export { UsersRepository }