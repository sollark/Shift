import { Profile } from './Profile'

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
  profile: Profile
  role: Role
  status: Status
}
