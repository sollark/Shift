import { AsyncLocalStorage } from 'async_hooks'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import {
  default as logger,
  default as loggerService,
} from './logger.service.js'

export type userData = {
  uuid: string
  companyNumber?: string
  employeeNumber?: string
}

export type requestData = {
  publicId?: string
}

export type SessionData = {
  userData?: userData
  requestData?: requestData
}

export const asyncLocalStorage = new AsyncLocalStorage<SessionData>()

export function setUuidToALS(uuid: string) {
  const store = asyncLocalStorage.getStore()
  if (!store) return

  store.userData = { uuid }
}

export function setUserDataToALS(userData: userData) {
  const store = asyncLocalStorage.getStore()
  if (!store) return

  store.userData = userData

  logger.info(`setUserDataToALS - userData: ${JSON.stringify(userData)}`)
}

export function setRequestDataToALS(requestData: requestData) {
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

export function getCompanyNumberFromALS() {
  const store = asyncLocalStorage.getStore()
  const companyNumber = store?.userData?.companyNumber

  if (!companyNumber) {
    logger.warn(`getCompanyNumberFromALS - cannot get companyNumber from ALS`)
  } else
    logger.info(`getCompanyNumberFromALS - companyNumber: ${companyNumber}`)

  return companyNumber
}

export function getEmployeeNumberFromALS() {
  const store = asyncLocalStorage.getStore()
  const employeeNumber = store?.userData?.employeeNumber

  if (!employeeNumber) {
    logger.warn(`getEmployeeNumberFromALS - cannot get employeeNumber from ALS`)
  } else
    loggerService.info(
      `getEmployeeNumberFromALS - employeeNumber: ${employeeNumber}`
    )

  return employeeNumber
}

export function getPublicIdFromALS() {
  const store = asyncLocalStorage.getStore()
  const publicId = store?.requestData?.publicId
  if (!publicId) throw new UnauthorizedError('You are not unauthorized')

  return publicId
}
