import { ACCOUNT_STATUS, Role, Status, USER_ROLE } from '@/models/Account'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type AccountState = {
  status: Status | null
  role: Role
  isVerified: boolean
  isComplete: boolean
}

type AccountActions = {
  setStatus: (status: Status) => void
  setRole: (role: Role) => void
  clearAccount: () => void
}

const useAccountStore = create<AccountState & AccountActions>()(
  zustandLogger(
    devtools(
      immer((set) => ({
        status: null,
        role: USER_ROLE.guest,
        isVerified: false,
        isComplete: false,
        setStatus: (status) => set((state) => ({ ...state, status })),
        setRole: (role) => set((state) => ({ ...state, role })),
        clearAccount: () =>
          set(() => ({
            status: null,
            role: USER_ROLE.guest,
            isVerified: false,
            isComplete: false,
          })),
      }))
    )
  )
)

export const accountSelector = {
  isVerified: (state: AccountState) => state.status !== ACCOUNT_STATUS.pending,
  isComplete: (state: AccountState) =>
    state.status !== ACCOUNT_STATUS.incomplete,
}

export default useAccountStore
