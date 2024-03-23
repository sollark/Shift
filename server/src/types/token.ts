type RefreshTokenPayload = {
  userData: TokenUserData
  iat: number
  exp: number
}

type TokenUserData = {
  uuid: string
}

type AccessTokenPayload = {
  userData: TokenUserData
  iat: number
  exp: number
}

export { AccessTokenPayload, RefreshTokenPayload, TokenUserData }
