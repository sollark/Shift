import { model, Schema } from 'mongoose'

export type RefreshTokenData = {
  refreshToken: string
  createdAt: Date
}

const RefreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const RefreshTokenModel = model<RefreshTokenData>(
  'RefreshTokenData',
  RefreshTokenSchema
)
export default RefreshTokenModel
