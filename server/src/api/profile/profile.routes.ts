import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import validationHandler from '../../middleware/validationHandler.js'
import { profileSchema } from '../../validations/profile.schema.js'
import { createProfile, getProfile } from './profile.controller.js'

const router = express.Router()

router.post(
  '/create',
  profileSchema,
  validationHandler,
  asyncHandler(createProfile)
)

router.get('/get', asyncHandler(getProfile))

export { router as profileRoutes }
