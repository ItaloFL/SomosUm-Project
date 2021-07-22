import { getRepository, Repository } from "typeorm"

import { ISessionsRepository } from "@modules/Accounts/Repositories/ISessionRepository"
import { Session } from "../entities/Sessions"

class SessionsRepository implements ISessionsRepository {
  private repository: Repository<Session>
  constructor() {
    this.repository = getRepository(Session);
  }
  async createSession(user_id: string): Promise<void> {
    const session = this.repository.create({ user_id });

    await this.repository.save(session);
  }

  async logout(user_id: string): Promise<void> {
    const info = await this.repository.findOne({
      where: { logout: null, user_id }
    })

    info.logout = new Date()
    await this.repository.save(info);

  }
}

export { SessionsRepository }