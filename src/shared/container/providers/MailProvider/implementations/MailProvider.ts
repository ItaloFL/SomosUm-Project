import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from 'nodemailer'
import smtpTransport from "nodemailer-smtp-transport";
import fs from 'fs'
import Handlebars from "handlebars";


class MailProvider implements IMailProvider{

  private client: Transporter
  
  constructor(){
    const user: string = process.env.API_VALIDATION_EMAIL
    const pass: string = process.env.API_VALIDATION_PASSWD

    this.client = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      port: 465,
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user, pass
      }
    }))
  }
  
  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = Handlebars.compile(templateFileContent)

    const templateHTML = templateParse(variables)

    await this.client.sendMail({
      to,
      subject,
      html: templateHTML
    })
  }
}

export { MailProvider }