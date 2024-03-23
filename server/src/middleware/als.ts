import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../service/als.service.js'
import { tokenService } from '../service/token.service.js'
import { AccessTokenPayload, RefreshTokenPayload } from '../types/token.js'
import logger from '../service/logger.service.js'

/**
 * Middleware to populate AsyncLocalStorage with user and request data.
 *
 * Extracts and validates JWT token to get user data.
 * Reads request cookie for publicId.
 * Populates ALS store with userData and requestData.
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
  const storage = {}

  asyncLocalStorage.run(storage, async () => {
    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    // Collect user's data from token
    const accessToken = getAuthToken(req)
    if (!accessToken) return next()

    const tokenData = await validateToken(accessToken)
    if (!tokenData) return next()

    const { uuid } = getUserData(tokenData)

    alsStore.userData = { uuid }
    logger.info(`User ${uuid} is making api request.`)

    // Collect request data from cookie
    const publicId = req.cookies['publicId']

    alsStore.requestData = { publicId }

    next()
  })
}

function getAuthToken(req: Request) {
  return req.headers.authorization?.split(' ')[1]
}

async function validateToken(
  token: string
): Promise<AccessTokenPayload | null> {
  if (!validateAccessTokenStructure(token)) return null

  return await tokenService.validateAccessToken(token)
}

function getUserData(tokenData: AccessTokenPayload) {
  return tokenData.userData
}

// TODO add this check in api/refresh
function validateRefreshTokenStructure(
  tokenData: any
): tokenData is RefreshTokenPayload {
  if (!tokenData || typeof tokenData !== 'object') {
    return false
  }

  if (!tokenData.userData || typeof tokenData.userData !== 'object')
    return false
  if (!tokenData.iat || typeof tokenData.iat !== 'number') return false
  if (!tokenData.exp || typeof tokenData.exp !== 'number') return false

  return true
}

function validateAccessTokenStructure(
  tokenData: any
): tokenData is AccessTokenPayload {
  if (!tokenData || typeof tokenData !== 'object') {
    return false
  }

  if (!tokenData.userData || typeof tokenData.userData !== 'object')
    return false
  if (!tokenData.iat || typeof tokenData.iat !== 'number') return false
  if (!tokenData.exp || typeof tokenData.exp !== 'number') return false

  return true
}

export default setupAsyncLocalStorage
