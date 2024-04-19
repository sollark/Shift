import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../service/als.service.js'
import { log } from '../service/console.service.js'
import logger from '../service/logger.service.js'
import { tokenService } from '../service/token.service.js'
import { AccessTokenPayload } from '../types/token.js'

/**
 * Middleware to populate AsyncLocalStorage with user and request data.
 *
 * Extracts and validates JWT token to get user data.
 * Reads request cookie for publicId.
 * Populates ALS store with userData and requestData(publicId).
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */

async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log('setupAsyncLocalStorage middleware')
  
  const storage = {}

  asyncLocalStorage.run(storage, async () => {
    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    // Collect user's data from token
    const accessToken = getAuthToken(req)
    if (!accessToken) return next()

    const tokenData = await tokenService.validateAccessToken(accessToken)
    if (!tokenData) return next()

    const { uuid, role } = getUserData(tokenData)

    alsStore.userData = { uuid, role }
    logger.info(`User ${uuid} (${role}) is making api request.`)

    next()
  })
}

function getAuthToken(req: Request) {
  return req.headers.authorization?.split(' ')[1]
}

function getUserData(tokenData: AccessTokenPayload) {
  return tokenData.userData
}

export default setupAsyncLocalStorage
