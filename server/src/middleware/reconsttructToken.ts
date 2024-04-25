import { NextFunction, Request, Response } from 'express'
import { log } from '../service/console.service'

function reconstructToken(req: Request, res: Response, next: NextFunction) {
  log('reconstructToken middleware')

  const { accessTokenHeaderPayload, accessTokenSignature } = req.cookies
  if (!accessTokenHeaderPayload || !accessTokenSignature) return next()

  const token = `${accessTokenHeaderPayload}.${accessTokenSignature}`

  // Set token in Authorization header
  req.headers.authorization = `Bearer ${token}`

  next()
}

export default reconstructToken
