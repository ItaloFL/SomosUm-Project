import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository{
    create( data: ICreateUserDTO ) :Promise<void>
    updatePassword(newPasswd: string, user_id: string): Promise<void>
    findbyEmail(email: string): Promise<User>
    findbyId(user_id: string): Promise<User>
    findbyCPF(CPF: string): Promise<User>
    findbyCNPJ(CNPJ: string): Promise<User>
    updateUser(info: ICreateUserDTO, user_id: string): Promise<User>
    list(): Promise<User[]>
    verifyIsAdmin(user_id: string): Promise<User>
}

export { IUserRepository }