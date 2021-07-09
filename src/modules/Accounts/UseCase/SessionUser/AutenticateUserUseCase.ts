import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import 'dotenv/config';

interface IRequestDTO{
    email: string,
    passwd: string
}

interface IResponse{
    user:{
        name: string;
        email: string;
    };
    token: string
}



@injectable()
class AutenticateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ){}


    async execute({email, passwd}: IRequestDTO ):Promise<IResponse>{


        //Verificando se o usuário existe;
        const user = await this.userRepository.findbyEmail(
            email
        );

        //Se não existir, retorna resposta de erro
        if(!user) {
            throw new AppError("Usuario não existente")
        }

        //Comparando a senha que usuário inseriu com a existente no banco
        const isValidPasswd = await compare(passwd, user.passwd);

        //Se não forem iguais, retorna resposta de erro
        if(isValidPasswd){
            throw new AppError("Usuario ou senha incorretos")
        }
    

        //Gerando token apartir do id do usuário, usando a chave de encriptação, token com validade de 1 dia;
        const token = sign({ id: user.user_id }, process.env.API_SECRET, {expiresIn: '1d'})
        

        const tokenReturn: IResponse = {
            token,
            user:{
                name: user.username,
                email: user.email
            }
        }

        return tokenReturn
        
    }
}


export { AutenticateUserUseCase }

    
