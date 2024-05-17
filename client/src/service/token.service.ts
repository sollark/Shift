import { jwtDecode } from 'jwt-decode'
import { log } from './console.service'

function decodeToken(token: string) {
  const decoded = jwtDecode(token)

  return decoded ? decoded : null
}

function isTokenExpired(token: string) {
  log('Checking if access token is expired ...')

  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) return true

  return false
}

export const tokenService = {
  decodeToken,
  isTokenExpired,
}
