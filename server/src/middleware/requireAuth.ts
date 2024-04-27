import { NextFunction, Request, Response } from 'express'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import { log } from '../service/console.service.js'
import { tokenService } from '../service/token.service.js'

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  log('requireAuth middleware')

  try {
    // Check if authorization header is present
    const authorizationKey = req.headers.authorization
    if (!authorizationKey) {
      return next(
        new UnauthorizedError(
          'You are not authorized to access this resource. Error code 1'
        )
      )
    }

    // Check if header is in correct format
    const accessToken = authorizationKey.split(' ')[1]
    if (!accessToken) {
      return next(
        new UnauthorizedError(
          'You are not authorized to access this resource. Error code 2'
        )
      )
    }

    // Validate access token
    const payload = await tokenService.validateAccessToken(accessToken)
    if (!payload) {
      return next(
        new UnauthorizedError(
          'You are not authorized to access this resource. Error code 3'
        )
      )
    }

    next()
  } catch (error) {
    return next(
      new UnauthorizedError(
        'You are not authorized to access this resource. Error code 4'
      )
    )
  }
}

export default requireAuth
