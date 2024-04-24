import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import logger from '../../service/logger.service.js'
import { authService } from './auth.service.js'

// save refresh token in cookie for 7 days
const tokenCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: 'strict' as const,
  httpOnly: true,
  secure: true,
}

export async function registration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const credentials = req.body
  const { email } = credentials
  const isMailExists = await authService.isEmailExists(email)
  if (isMailExists) {
    res.status(200).json({
      success: false,
      message: 'Email already taken.',
    })

    return
  }

  const uuid = await authService.registration(credentials)
  if (!uuid) {
    res.status(200).json({
      success: false,
      message: 'Could not create new account.',
    })

    return
  }

  const tokens = await authService.generateTokens(uuid)
  if (!tokens) {
    res.status(200).json({
      success: false,
      message: 'Could not create tokens.',
    })

    return
  }
  const { accessToken, refreshToken } = tokens
  res.cookie('refreshToken', refreshToken, tokenCookieOptions)

  res.status(200).json({
    success: true,
    message: 'New access token.',
    data: { accessToken },
  })
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const credentials = req.body
  const { email, password } = credentials

  const isMailExists = await authService.isEmailExists(email)
  if (!isMailExists) {
    return res.status(200).json({
      success: false,
      message: 'Email does not exists',
    })
  }

  const uuid = await authService.signIn(email, password)
  if (!uuid) {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials',
    })
  }

  const tokens = await authService.generateTokens(uuid)
  if (!tokens) {
    logger.warn(`authService - signIn, cannot generate tokens for ${email}`)

    return res.status(200).json({
      success: false,
      message: 'Cannot generate tokens',
    })
  }

  const { accessToken, refreshToken } = tokens
  res.cookie('refreshToken', refreshToken, tokenCookieOptions)

  res.status(200).json({
    success: true,
    message: 'New access token.',
    data: { accessToken },
  })
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.cookies

  const result = await authService.signOut(refreshToken)

  if (result?.deletedCount > 0)
    res.clearCookie('refreshToken').status(200).json({ message: 'success' })
  else throw new BadRequestError('No refresh token found')
}

// renew access token when it is expired
export async function refresh(req: Request, res: Response, next: NextFunction) {
  const { refreshToken: currentRefreshToken } = req.cookies

  // TODO checking response is not relevant, because error is thrown
  const response = await authService.refresh(currentRefreshToken)
  if (!response) {
    res.status(200).json({
      success: false,
      message: 'Cannot refresh access token',
    })
    res.redirect('/signin')

    return
  }

  const { accessToken, refreshToken: newRefreshToken } = response

  logger.info('refreshing expired access token')

  // save refresh token in cookie for 7 days
  res.cookie('refreshToken', newRefreshToken, tokenCookieOptions)

  res.status(200).json({
    success: true,
    message: 'New access token.',
    data: { accessToken },
  })
}
