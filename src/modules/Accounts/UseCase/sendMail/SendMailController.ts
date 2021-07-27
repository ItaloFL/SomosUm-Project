import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendMailUseCase } from './SendMailUseCase'


class SendMailController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { email } = request.body

        const sendMailUseCase = container.resolve(SendMailUseCase)

        const token = await sendMailUseCase.execute(email)

        return response.status(201).json(token)
    }


}


export { SendMailController }