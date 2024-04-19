import express from 'express'
import { accountRoutes } from './api/account/account.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { profileRoutes } from './api/profile/profile.routes.js'
import { deleteSensitiveData } from './middleware/deleteSensitiveData.js'

const router = express.Router()

router.use(deleteSensitiveData)

router.use('/auth', authRoutes)
router.use('/account', accountRoutes)
router.use('/profile', profileRoutes)

export default router
