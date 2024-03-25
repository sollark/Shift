import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import { profileSchema } from '../../validations/profile.schema.js'
import validationHandler from '../../middleware/validationHandler.js'
import { createProfile } from './profile.controller.js'

const router = express.Router()

router.post(
  '/create',
  profileSchema,
  validationHandler,
  asyncHandler(createProfile)
)

export { router as profileRoutes }
