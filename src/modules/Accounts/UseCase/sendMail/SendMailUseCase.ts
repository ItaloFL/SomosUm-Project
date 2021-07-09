import { inject, injectable } from "tsyringe";
import nodemailer from 'nodemailer'
import 'dotenv'
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { createEncryptedCode } from "@utils/createEncryptedCode";
import smtpTransport from 'nodemailer-smtp-transport';
import { sign } from 'jsonwebtoken';


@injectable()
class SendMailUseCase{
    constructor(
      @inject("UsersRepository")
      private userRepository: IUserRepository
    ){}

    async execute(email: string){

    email = email.trim()
    const emailExists = await this.userRepository.findbyEmail(
      email
    ) 
    if(!emailExists){
      throw new AppError("Email não cadastrado!", 404)
    }
    
    const { user_id } = emailExists

    const user:string = process.env.API_VALIDATION_EMAIL
    const pass:string = process.env.API_VALIDATION_PASSWD

    const transporter =  nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
            user, pass
        }
    }));

    const {code, encryptedCode} = createEncryptedCode()
    const Token = sign({ id: encryptedCode, uid: user_id}, process.env.API_NEW_PASSWD, {expiresIn: '15m'})
    
    try{
      await transporter.sendMail({
          from: 'cod.somosum@gmail.com',
          to:  `${email}`,
          subject: 'Codigo para a recuperação da sua senha',
          text: `Ola querido cliente, com seu pedido de troca de senha, estamos 
          enviando um código, por favor, o coloque no campo descrito no aplicativo ${code}!`
      })
      const auth = {token: Token}
      return auth
    
    }catch{
      throw new AppError("Não foi possível enviar o email, tente novamente!");
    }
  }
}


export { SendMailUseCase }