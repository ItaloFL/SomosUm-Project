import { container } from 'tsyringe'

import { UsersRepository } from '@modules/Accounts/infra/typeorm/repositories/UsersRepository'
import { IUserRepository } from '@modules/Accounts/Repositories/IUserRepository'

import { ViewsRepository } from '@modules/Adverts/infra/typeorm/repositories/ViewRepository'
import { IViewsRepository } from '@modules/Adverts/Repositories/IViewsRepository'

import { AnunciosRepository } from '@modules/Adverts/infra/typeorm/repositories/AnunciosRepository'
import { IAnunciosRepository } from '@modules/Adverts/Repositories/IAnunciosRepository'

import { CategoriesRepository } from '@modules/Adverts/infra/typeorm/repositories/CategoriesRepository'
import { ICategoriesRepository } from '@modules/Adverts/Repositories/ICategoriesRepository'

import { SessionsRepository } from '@modules/Accounts/infra/typeorm/repositories/SessionsRepository'
import { ISessionsRepository } from '@modules/Accounts/Repositories/ISessionRepository'

import { IUsersTokenRepository } from '@modules/Accounts/Repositories/IUsersTokenRepository'
import { UsersTokensRepository } from '@modules/Accounts/infra/typeorm/repositories/UsersTokenRepository'

import { IDateProvider } from './providers/IDateProvider'
import { DateProvider } from './providers/implementations/DateProvider'



container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IAnunciosRepository>(
    "AnunciosRepository",
    AnunciosRepository
)

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<IViewsRepository>(
    "ViewRepository",
    ViewsRepository
)

container.registerSingleton<ISessionsRepository>(
    "SessionsRepository",
    SessionsRepository
)

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokensRepository
)

container.registerSingleton<IDateProvider>(
  "DateProvider",
  DateProvider
)