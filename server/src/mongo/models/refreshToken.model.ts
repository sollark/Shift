import { model, Schema } from 'mongoose'

export type RefreshTokenData = {
  refreshToken: string
  createdAt: Date
}

const RefreshTokenDataSchema = new Schema(
  {
    refreshToken: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

const RefreshTokenDataModel = model<RefreshTokenData>(
  'RefreshTokenData',
  RefreshTokenDataSchema
)
export default RefreshTokenDataModel
