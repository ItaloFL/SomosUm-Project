
import { CreateSubscriptionController } from '@modules/Accounts/UseCase/createSubscription/CreateSubscriptionController';
import { Router } from 'express'

import { authMiddleware } from '../middlewares/authMiddlewares';

const subscriptionsRoutes = Router()

const createSubscriptionController = new CreateSubscriptionController()


subscriptionsRoutes.post("/", authMiddleware, createSubscriptionController.handle);//criar anuncio

export { subscriptionsRoutes }
