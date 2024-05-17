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
  if (success) saveAccessToken()

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
  if (success) saveAccessToken()

  // Fetch account and save it in the store
  await accountService.getAccount()

  return { success, message }
}

async function signOut() {
  log('authService - signOut')

  await httpService.put('auth/signout')

  storeService.clearStoreStates()
}

async function refreshTokens() {
  log('authService - refreshTokens')

  const refreshResponse = await httpService.get<AuthData>(`auth/refresh`)
  if (!refreshResponse || !refreshResponse.success) {
    // Delete all states from the store
    storeService.clearStoreStates()

    return { success: false, message: 'Failed to refresh token' }
  }

  const { success, message } = refreshResponse
  log('authService - refreshTokens, message: ', message)

  saveAccessToken()

  return { success, message }
}

export const authService = {
  signIn,
  signOut,
  registration,
  refreshTokens,
}

function saveAccessToken() {
  const headerPayload = cookieService.getCookieValue('accessTokenHeaderPayload')
  if (!headerPayload) {
    log('authService, accessTokenHeaderPayload is missing')
    return
  }
  storeService.saveAccessToken(headerPayload)
}
