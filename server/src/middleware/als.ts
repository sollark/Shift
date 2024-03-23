import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../service/als.service.js'
import { tokenService } from '../service/token.service.js'

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

    const { uuid, companyNumber, employeeNumber } = getUserData(tokenData)

    alsStore.userData = { uuid, companyNumber, employeeNumber }

    // Collect request data from cookie
    const publicId = req.cookies['publicId']

    alsStore.requestData = { publicId }

    next()
  })
}

function getAuthToken(req: Request) {
  return req.headers.authorization?.split(' ')[1]
}

async function validateToken(token: string) {
  return await tokenService.validateAccessToken(token)
}

function getUserData(tokenData: any) {
  return tokenData.userData
}

export default setupAsyncLocalStorage
