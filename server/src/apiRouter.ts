import cookieParser from 'cookie-parser'
import express from 'express'
import setupAsyncLocalStorage from './middleware/als.js'
import { deleteSensitiveData } from './middleware/deleteSensitiveData.js'

const router = express.Router()

router.use(cookieParser())
router.use(setupAsyncLocalStorage)
router.use(deleteSensitiveData)

// router.use('/auth', authRoutes)
// router.use('/account', accountRoutes)
// router.use('/profile', profileRoutes)
// router.use('/employee', employeeRoutes)
// router.use('/company', companyRoutes)

export default router
