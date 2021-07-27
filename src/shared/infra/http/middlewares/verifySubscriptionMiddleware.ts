import { SubscriptionsRepository } from "@modules/Accounts/infra/typeorm/repositories/SubscriptionsRepository";
import { UsersRepository } from "@modules/Accounts/infra/typeorm/repositories/UsersRepository";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";



async function verifySubscriptionMiddleware(request: Request, response: Response, next: NextFunction){

  const userId = request.userId

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findbyId(userId)

  const subscriptionsRepository = new SubscriptionsRepository()

  const sub = await subscriptionsRepository.findById(user.user_id)

  const dateProvider = new DayJsDateProvider()

  const dateNow = dateProvider.dateNow()

  const verifySubExpiresDate = dateProvider.compareInDays(dateNow, sub.expire_date)

  try {
    if(verifySubExpiresDate < 0){
      next()
    }
  } catch{
    throw new AppError("Your subcription already expired")
  }
}

export { verifySubscriptionMiddleware }