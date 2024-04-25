import { accountService } from './account.service'
import { httpService } from './axios/http.service'
import { log } from './console.service'
import { cookieService } from './cookie.service'
import { storeService } from './store.service'

type AuthData = {
  accessToken: string
}

async function registration(email: string, password: string) {
  const registrationResponse = await httpService.post<AuthData>(
    'auth/registration',
    { email, password }
  )

  if (!registrationResponse)
    return { success: false, message: 'Cannot connect to server' }

  const { success, message } = registrationResponse
  if (message) log('authService - registration, message: ', message)
  if (success) {
    const headerPayload = cookieService.getCookieValue('headerPayload')
    if (!headerPayload) {
      log('authService - registration, headerPayload is missing')
      return
    }
    storeService.saveAccessToken(headerPayload)
  }

  return { success, message }
}

async function signIn(email: string, password: string) {
  const signInResponse = await httpService.post<AuthData>('auth/signin', {
    email,
    password,
  })

  if (!signInResponse || !signInResponse.success)
    return { success: false, message: 'Cannot connect to server' }

  const { success, message } = signInResponse
  if (message) log('authService - signIn, message: ', message)
  if (success) {
    const headerPayload = cookieService.getCookieValue(
      'accessTokenHeaderPayload'
    )
    if (!headerPayload) {
      log('authService - signIn, accessTokenHeaderPayload is missing')
      return
    }
    storeService.saveAccessToken(headerPayload)
  }

  // Fetch account and save it in store
  await accountService.getAccount()

  return { success, message }
}

async function signOut() {
  log('signOut')

  await httpService.put('auth/signout')

  storeService.clearStoreStates()
}

async function refreshTokens() {
  log('authService - refreshTokens')

  const refreshResponse = await httpService.get<AuthData>(`auth/refresh`)
  if (!refreshResponse || !refreshResponse.success)
    return { success: false, message: 'Failed to refresh token' }

  const { success, message } = refreshResponse
  if (message) log('authService - refreshTokens, message: ', message)
  if (success) {
    const headerPayload = cookieService.getCookieValue('headerPayload')
    if (!headerPayload) {
      log('authService - refreshTokens, headerPayload is missing')
      return
    }
    storeService.saveAccessToken(headerPayload)
  }
}

export const authService = {
  signIn,
  signOut,
  registration,
  refreshTokens,
}
