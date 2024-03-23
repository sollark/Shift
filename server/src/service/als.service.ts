import { AsyncLocalStorage } from 'async_hooks'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import { TokenUserData } from '../types/token.js'
import logger from './logger.service.js'

export type RequestData = {
  publicId?: string
}

export type SessionData = {
  userData?: TokenUserData
  requestData?: RequestData
}

export const asyncLocalStorage = new AsyncLocalStorage<SessionData>()

export function setUuidToALS(uuid: string) {
  const store = asyncLocalStorage.getStore()
  if (!store) return

  store.userData = { uuid }
}

export function setUserDataToALS(userData: TokenUserData) {
  const store = asyncLocalStorage.getStore()
  if (!store) return

  store.userData = userData

  logger.info(`setUserDataToALS - userData: ${JSON.stringify(userData)}`)
}

export function setRequestDataToALS(requestData: RequestData) {
  const store = asyncLocalStorage.getStore()
  if (!store) return

  store.requestData = requestData
  logger.info(
    `setRequestDataToALS - requestData: ${JSON.stringify(requestData)}`
  )
}

export function getUuidFromALS() {
  const store = asyncLocalStorage.getStore()
  const uuid = store?.userData?.uuid
  if (!uuid) throw new UnauthorizedError('You are not unauthorized')

  return uuid
}

export function getPublicIdFromALS() {
  const store = asyncLocalStorage.getStore()
  const publicId = store?.requestData?.publicId
  if (!publicId) throw new UnauthorizedError('You are not unauthorized')

  return publicId
}
