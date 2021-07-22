
interface ISessionsRepository {
  createSession(user_id: string): Promise<void>;
  logout(user_id: string): Promise<void>;
}

export { ISessionsRepository }