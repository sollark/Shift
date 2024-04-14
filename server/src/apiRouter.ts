import express from 'express'
import { deleteSensitiveData } from './middleware/deleteSensitiveData.js'
import { authRoutes } from './api/auth/auth.routes.js'

const router = express.Router()

// router.use(setupAsyncLocalStorage)
router.use(deleteSensitiveData)

router.use('/auth', authRoutes)
// router.use('/account', accountRoutes)
// router.use('/profile', profileRoutes)
// router.use('/employee', employeeRoutes)
// router.use('/company', companyRoutes)

export default router
