import { ICreateUserDTO } from "@modules/Accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/Accounts/Repositories/IUserRepository";
import { User } from "../../entities/User";




class UsersRepositoryInMemory implements IUserRepository{

    users: User[] = []

    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user,{
            ...data
        })

        this.users.push(user)
        
    }
    async updatePassword(newPasswd: string, user_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findbyEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email)
    }
    async findbyId(user_id: string): Promise<User> {
        return this.users.find((user) => user.user_id === user_id)
    }
    async findbyCPF(CPF: string): Promise<User> {
        return this.users.find((user) => user.CPF === CPF)
    }
    async findbyCNPJ(CNPJ: string): Promise<User> {
        return this.users.find((user) => user.CNPJ === CNPJ)
    }
    async updateUser(info: ICreateUserDTO, user_id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async list(): Promise<User[]> {
        const allusers = this.users

        return allusers
    }
    async verifyIsAdmin(user_id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }


}



export { UsersRepositoryInMemory }