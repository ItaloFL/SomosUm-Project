import { Router } from 'express'

import { AdvertsRoutes } from './adverts.routes'
import { CategoryRoutes } from './categories.routes'
import { userRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'
import { subscriptionsRoutes } from './subscription.routes'

const router = Router()

router.use(AdvertsRoutes)
router.use(CategoryRoutes)
router.use(userRoutes)
router.use(authenticateRoutes)
router.use("/subscriptions", subscriptionsRoutes)

export { router }