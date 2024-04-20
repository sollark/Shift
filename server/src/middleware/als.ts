import { NextFunction, Request, Response } from 'express'
import {
  asyncLocalStorage,
  setRequestDataToALS,
  setUserDataToALS,
} from '../service/als.service.js'
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

    const { uuid, publicId, role } = getUserData(tokenData)

    const userData = { uuid, publicId, role }
    const requestData = { publicId }
    setUserDataToALS(userData)
    setRequestDataToALS(requestData)

    // Pathname of the request
    const url = req.url
    // Including the query string
    const originalUrl = req.originalUrl
    const requestMethod = req.method

    logger.info(`User (${role}) is making ${requestMethod} request to ${url}`)

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
