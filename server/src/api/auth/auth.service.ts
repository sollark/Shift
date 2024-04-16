import bcrypt from 'bcrypt'
import BadRequestError from '../../errors/BadRequestError.js'
import InternalServerError from '../../errors/InternalServerError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import { Account } from '../../mongo/models/account.model.js'
import authModel, { Credentials } from '../../mongo/models/auth.model.js'
import { SessionData, setUserDataToALS } from '../../service/als.service.js'
import { log } from '../../service/console.service.js'
import logger from '../../service/logger.service.js'
import { tokenService } from '../../service/token.service.js'
import { uuidService } from '../../service/uuid.service.js'
import { accountService } from '../account/account.service.js'

async function registration(credentials: Credentials) {
  const { email, password } = credentials

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10)

  // Create a new authentication
  const uuid = await uuidService.getAuthUuid()
  const auth = await authModel.create({ uuid, email, password: hashPassword })
  if (!auth) throw new InternalServerError('Could not create authentication')
  logger.info(`authService - New authentication created for email: ${email}`)

  // create a new account
  const account = await accountService.createAccount(uuid)
  if (!account) throw new BadRequestError('Could not create account')

  return account
}

async function signIn(
  email: string,
  password: string
): Promise<Account | null> {
  const auth = await authModel.findOne({ email }).select('+password')
  if (!auth) return null

  const hashPassword = auth.password
  const isPasswordValid = await bcrypt.compare(password, hashPassword)
  if (!isPasswordValid) {
    logger.warn(`authService - Sign in failed for email: ${email}`)

    return null
  }

  const { uuid } = auth
  setUserDataToALS({ uuid: auth.uuid })

  const account = await accountService.getAccount(uuid)
  if (!account) {
    logger.error(`authService - Sign in failed for email: ${email}`)
    return null
  }

  logger.info(
    `authService - Sign in successful for email: ${email}, uuid: ${auth.uuid}`
  )

  return account
}

async function generateTokens(uuid: string) {
  // Get payload info
  const account = await accountService.getAccount(uuid)
  if (!account) return null

  const payload: SessionData = {
    userData: { uuid },
  }

  // Generate tokens
  const tokens = tokenService.generateTokens(payload)
  const { refreshToken } = tokens

  // Save refresh token to db
  await tokenService.saveToken(refreshToken)

  return tokens
}

async function signOut(refreshToken: string) {
  const result = await tokenService.removeToken(refreshToken)

  logger.info(`authService - signOut, user signed out`)

  return result
}

async function refresh(refreshToken: string) {
  const refreshTokenCopy = await tokenService.getRefreshToken(refreshToken)
  if (!refreshTokenCopy) throw new UnauthorizedError('Invalid refresh token')
  else await tokenService.removeToken(refreshTokenCopy)

  const isExpired = await tokenService.isExpired(refreshTokenCopy)
  if (isExpired) throw new UnauthorizedError('Refresh token is expired')

  // Generate new pair of tokens
  const payload = await tokenService.validateRefreshToken(refreshTokenCopy)
  const sessionData = payload as SessionData
  const uuid = sessionData.userData?.uuid
  if (!uuid) throw new InternalServerError('Could not get payload')
  log('sessiondata and uuid', sessionData, uuid)

  const tokens = await generateTokens(uuid)
  if (!tokens) throw new InternalServerError('Could not generate tokens')

  // Save new refresh token to db
  await tokenService.saveToken(tokens.refreshToken)

  return { ...tokens }
}

async function isEmailExists(email: string) {
  const existingEmail = await authModel.findOne({ email })
  if (existingEmail) logger.warn(`authService - email already taken: ${email}`)

  return existingEmail ? true : false
}

export const authService = {
  registration,
  signIn,
  generateTokens,
  signOut,
  refresh,
  isEmailExists,
}
