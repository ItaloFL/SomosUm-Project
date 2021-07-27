import { container } from 'tsyringe'
import { IMailProvider } from './IMailProvider'
import { MailProvider } from './implementations/MailProvider'


container.registerInstance<IMailProvider>(
  "MailProvider",
  new MailProvider()
)