import { Role } from '../mongo/models/account.model'

type RefreshTokenPayload = {
  sub: string
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
  publicId: string
  role: Role
}

export { AccessTokenPayload, RefreshTokenPayload, TokenUserData }
