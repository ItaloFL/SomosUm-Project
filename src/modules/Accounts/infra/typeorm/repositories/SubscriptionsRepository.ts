import { getRepository, Repository } from "typeorm";

import { ISubscriptionsRepository } from "@modules/Accounts/Repositories/ISubscriptionsRepository";
import { Subscription } from "../entities/Subscription";


class SubscriptionsRepository implements ISubscriptionsRepository {
  private repository: Repository<Subscription>
  constructor() {
    this.repository = getRepository(Subscription);
  }
  
  async create(user_id: string, expire_date: Date, subscription_id?: string): Promise<Subscription> {
    const subscription = this.repository.create({user_id, expire_date, id: subscription_id});

    await this.repository.save(subscription);
z
    return subscription;
  }

  async findById(user_id: string): Promise<Subscription> {
    const subscription = await this.repository.findOne({ user_id });

    return subscription;
  }
}

export { SubscriptionsRepository }