import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import logger from '../../service/logger.service.js'
import { tokenService } from '../../service/token.service.js'
import { authService } from './auth.service.js'

// Save refresh token in cookie for 30 days (jwt exp may be different)
const refreshTokenCookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: 'strict' as const,
  httpOnly: true,
  secure: true,
}

// Save access token in cookies for 7 days  (jwt exp may be different)
const accessTokenCookieOptions = {
  headerPayload: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'strict' as const,
    secure: true,
  },
  signature: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'strict' as const,
    secure: true,
    httpOnly: true,
  },
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
  setAuthCookies(res, accessToken, refreshToken)

  res.status(200).json({
    success: true,
    message: 'Successful registration.',
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
  setAuthCookies(res, accessToken, refreshToken)

  res.status(200).json({
    success: true,
    message: 'Successful sign in.',
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
  logger.info('Refreshing expired access token')

  const { refreshToken: currentRefreshToken } = req.cookies

  // TODO checking response is not relevant, because error is thrown
  const tokens = await authService.refresh(currentRefreshToken)
  if (!tokens) {
    res.status(200).json({
      success: false,
      message: 'Cannot refresh access token',
    })
    res.redirect('/signin')

    return
  }

  const { accessToken, refreshToken: newRefreshToken } = tokens
  setAuthCookies(res, accessToken, newRefreshToken)

  res.status(200).json({
    success: true,
    message: 'Successful token refresh.',
  })
}

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
) {
  const { headerPayload, signature } = tokenService.splitToken(accessToken)

  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
  res.cookie(
    'accessTokenHeaderPayload',
    headerPayload,
    accessTokenCookieOptions.headerPayload
  )
  res.cookie(
    'accessTokenSignature',
    signature,
    accessTokenCookieOptions.signature
  )
}
