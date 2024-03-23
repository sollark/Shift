import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { registrationSchema } from '../../middleware/validations/registration.schema.js'
import { signInSchema } from '../../middleware/validations/signIn.schema.js'
import validateRequest from '../../middleware/validations/validationHandler.js'
import { refresh, registration, signIn, signOut } from './auth.controller.js'

const router = express.Router()

router.post(
  '/registration',
  registrationSchema,
  validateRequest,
  asyncHandler(registration)
)
router.post('/signin', signInSchema, validateRequest, asyncHandler(signIn))
router.put('/signout', requireAuth, asyncHandler(signOut))
router.get('/refresh', asyncHandler(refresh))

export { router as authRoutes }
