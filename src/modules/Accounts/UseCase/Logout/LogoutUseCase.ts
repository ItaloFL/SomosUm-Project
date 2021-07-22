import { ISessionsRepository } from "@modules/Accounts/Repositories/ISessionRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class LogoutUseCase {
  constructor(
    @inject("SessionsRepository")
    private sessionsRepository: ISessionsRepository
  ) { }
  async execute(user_id: string): Promise<void> {
    await this.sessionsRepository.logout(user_id);

  }
}

export { LogoutUseCase }