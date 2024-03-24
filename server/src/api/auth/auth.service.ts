import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import BadRequestError from '../../errors/BadRequestError.js'
import InternalServerError from '../../errors/InternalServerError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongo/models/auth.model.js'
import { SessionData, setUserDataToALS } from '../../service/als.service.js'
import logger from '../../service/logger.service.js'
import { tokenService } from '../../service/token.service.js'
import { accountService } from '../account/account.service.js'
import { profileService } from '../profile/profile.service.js'

async function registration(credentials: Credentials) {
  const { email, password } = credentials

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10)

  // Create a new authentication
  const uuid = uuidv4()
  const auth = await authModel.create({ uuid, email, password: hashPassword })
  if (!auth) throw new InternalServerError('Could not create authentication')
  logger.info(`authService - New authentication created for email: ${email}`)

  // create a new account
  const account = await accountService.createAccount(uuid)
  if (!account) throw new BadRequestError('Could not create account')

  return account
}

async function signIn(email: string, password: string) {
  const result = await authModel.findOne({ email }).select('+password')
  if (!result) return null

  const hashPassword = result.password
  const isPasswordValid = await bcrypt.compare(password, hashPassword)

  if (isPasswordValid) {
    setUserDataToALS({ uuid: result.uuid })

    logger.info(
      `authService - Sign in successful for email: ${email}, uuid: ${result.uuid}`
    )
  } else {
    logger.warn(`authService - Sign in failed for email: ${email}`)
  }

  return isPasswordValid ? result.uuid : null
}

async function generateTokens(uuid: string) {
  // get payload info
  const account = await accountService.getAccount(uuid)
  if (!account) return null

  const payload: SessionData = {
    userData: { uuid },
  }

  // generate tokens
  const tokens = tokenService.generateTokens(payload)
  const { refreshToken } = tokens

  // save refresh token to db
  await tokenService.saveToken(refreshToken)

  return tokens
}

async function signOut(refreshToken: string) {
  const result = await tokenService.removeToken(refreshToken)

  logger.info(`authService - signOut, user signed out`)

  return result
}

async function refresh(refreshToken: string) {
  // const uuid = getUuidFromALS()
  const refreshTokenCopy = await tokenService.getRefreshToken(refreshToken)
  if (!refreshTokenCopy) throw new UnauthorizedError('Invalid refresh token')

  const isExpired = await tokenService.isExpired(refreshTokenCopy)
  if (isExpired) throw new UnauthorizedError('Refresh token is expired')

  // generate tokens
  const payload = await tokenService.validateRefreshToken(refreshTokenCopy)
  const sessionData = payload as SessionData
  const uuid = sessionData.userData?.uuid
  console.log('sessiondata and uuid', sessionData, uuid)
  if (!uuid) throw new InternalServerError('Could not get payload')

  const tokens = await generateTokens(uuid)
  if (!tokens) throw new InternalServerError('Could not generate tokens')

  // save refresh token to db
  await tokenService.saveToken(tokens.refreshToken)

  return { ...tokens }
}

async function isEmailExists(email: string) {
  const existingAuthUser = await authModel.findOne({ email })
  if (!existingAuthUser)
    logger.warn(`authService - email does not exist: ${email}`)

  return existingAuthUser ? true : false
}

export const authService = {
  registration,
  signIn,
  generateTokens,
  signOut,
  refresh,
  isEmailExists,
}
