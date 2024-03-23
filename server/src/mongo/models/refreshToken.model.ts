import { model, Schema } from 'mongoose'

export type RefreshTokenData = {
  refreshToken: string
  createdAt: Date
}

const RefreshTokenSchema = new Schema()

const RefreshTokenModel = model<RefreshTokenData>(
  'RefreshTokenData',
  RefreshTokenSchema
)
export default RefreshTokenModel
