import { Subscription } from "../infra/typeorm/entities/Subscription";

interface ISubscriptionsRepository {
  create(user_id: string, expire_date: Date ): Promise<Subscription>
  findById(user_id: string): Promise<Subscription>
}

export { ISubscriptionsRepository }