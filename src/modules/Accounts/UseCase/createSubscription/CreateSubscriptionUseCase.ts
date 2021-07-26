import { inject, injectable } from "tsyringe";

import { ISubscriptionsRepository } from "@modules/Accounts/Repositories/ISubscriptionsRepository";
import { IDateProvider } from "@shared/container/providers/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateSubscriptionUseCase {
  constructor(
    @inject("SubscriptionsRepository")
    private subscriptionsRepository: ISubscriptionsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    ) {}
  async execute(user_id: string) {
    const subscriptionExists = await this.subscriptionsRepository.findById(user_id);

    if (subscriptionExists.paid) {
      throw new AppError("User already got an paid subscription"); 
    }

    const dateNow = this.dateProvider.dateNow()
    const expire_date = this.dateProvider.sumSubscriptionDays(dateNow);

    const subscription = await this.subscriptionsRepository.create(user_id, expire_date);
  }
}

export { CreateSubscriptionUseCase }