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
  employee: 'employee',
  manager: 'manager',
  supervisor: 'supervisor',
  admin: 'admin',
} as const
export type Role = keyof typeof USER_ROLE

export type Account = {
  uuid: string
  profile: Profile
  status: Status
  role?: Role
}

export type AccountDoc = {
  uuid: string
  profile: Types.ObjectId
  status: Status
  role?: Role
}

const AccountSchema = new Schema({
  uuid: { type: String, unique: true },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.pending,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.employee,
    required: true,
  },
})

const accountModel = model<AccountDoc>('Account', AccountSchema)
export default accountModel
