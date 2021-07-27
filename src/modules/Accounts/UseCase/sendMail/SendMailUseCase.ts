import { inject, injectable } from "tsyringe";
import 'dotenv'
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "../../Repositories/IUserRepository";
import { createEncryptedCode } from "@utils/createEncryptedCode";
import { sign } from 'jsonwebtoken';
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path";


@injectable()
class SendMailUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ){}

  async execute(email: string) {

    const emailExists = await this.userRepository.findbyEmail(
      email
    )
    
    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "ForgotPassword.hbs")
    
    if (!emailExists) {
      throw new AppError("Email does not exist!")
    }

    const { user_id } = emailExists

    const { code, encryptedCode } = createEncryptedCode()
    const Token = sign({ id: encryptedCode, uid: user_id }, process.env.API_NEW_PASSWD, { expiresIn: '15m' })

    const variables = {
      name: emailExists.username,
      code
    }

    try {
      const user =  await this.mailProvider.sendMail(
        email,
        "Recuperação de senha",
        variables,
        templatePath
      )

      // const auth = { token: Token }
      // return auth
      
    } catch {
      console.log(email)
      console.log(variables)
      console.log(templatePath)
      throw new AppError("Unable to send email, please try again!");
    }
  }
}


export { SendMailUseCase }