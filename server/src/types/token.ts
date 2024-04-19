import { Role } from '../mongo/models/account.model'

type RefreshTokenPayload = {
  iat: number
  exp: number
}

type AccessTokenPayload = {
  userData: TokenUserData
  iat: number
  exp: number
}

type TokenUserData = {
  uuid: string
  role: Role
}

export { AccessTokenPayload, RefreshTokenPayload, TokenUserData }
