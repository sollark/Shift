import { httpService } from './axios/http.service'
import { log } from './console.service'
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
  if (success) {
    const { data } = registrationResponse
    log('registration, message: ', message)

    const { accessToken } = data
    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  }

  // TODO clear comments
  // lets make registration with account creation

  return { success, message }
}

async function signIn(email: string, password: string) {
  const signInResponse = await httpService.post<AuthData>('auth/signin', {
    email,
    password,
  })

  if (!signInResponse)
    return { success: false, message: 'Cannot connect to server' }

  const { success, message } = signInResponse

  if (success) {
    const { data } = signInResponse
    const { accessToken } = data
    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  }

  return { success, message }
}

async function signOut() {
  log('signOut')

  await httpService.put('auth/signout')

  storeService.clearStoreStates()
}

async function refreshTokens() {
  log('refreshTokens')

  const refreshResponse = await httpService.get<AuthData>(`auth/refresh`)

  log('refreshTokens, response data', refreshResponse)

  if (!refreshResponse)
    return { success: false, message: 'Cannot connect to server' }

  const { success } = refreshResponse
  if (success) {
    const { data } = refreshResponse
    const { accessToken } = data

    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  } else {
    log('Failed to refresh token')
  }
}

export const authService = {
  signIn,
  signOut,
  registration,
  refreshTokens,
}
