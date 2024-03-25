import { body } from 'express-validator'

export const signInSchema = [
  body('email').exists().withMessage('Email is required'),
  body('password').exists().withMessage('Password is required'),
]
