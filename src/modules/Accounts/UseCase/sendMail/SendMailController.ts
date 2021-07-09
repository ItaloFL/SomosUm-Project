import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { SendMailUseCase } from './SendMailUseCase'


class SendMailController{

    async handle(request: Request, response: Response): Promise<Response>{

        const { email } = request.body

        const sendMailUseCase = container.resolve(SendMailUseCase)

        const mailsend = await sendMailUseCase.execute(email)

        if(!mailsend){
            throw new AppError("Email não enviado")
        }

        return response.status(201).send()
    }


}


export { SendMailController }