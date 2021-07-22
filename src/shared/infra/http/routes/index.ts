import { Router } from 'express'

import { AdvertsRoutes } from './adverts.routes'
import { CategoryRoutes } from './categories.routes'
import { userRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'

const router = Router()

router.use(AdvertsRoutes)
router.use(CategoryRoutes)
router.use(userRoutes)
router.use(authenticateRoutes)

export { router }