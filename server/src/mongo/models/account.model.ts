import { Schema, Types, model } from 'mongoose'
import { Profile } from './profile.model.js'

export const ACCOUNT_STATUS = {
  incomplete: 'incomplete',
  pending: 'pending',
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export const USER_ROLE = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
} as const
export type Role = keyof typeof USER_ROLE

export type Account = {
  uuid: string
  profile: Profile
  status: Status
  role: Role
}

export type AccountDoc = {
  _id: Types.ObjectId
  uuid: string
  profile?: Types.ObjectId
  status: Status
  role: Role
}

const AccountSchema = new Schema({
  uuid: { type: String, unique: true },
  profile: {
    type: Types.ObjectId,
    ref: 'Profile',
  },
  status: {
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.incomplete,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.user,
    required: true,
  },
})

const accountModel = model<AccountDoc>('Account', AccountSchema)
export default accountModel
