import { Role, Status, USER_ROLE } from '@/models/Account'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type AccountState = {
  status: Status | null
  role: Role
  isComplete: () => boolean
  isVerified: () => boolean
  updateStatus: () => void
  setStatus: (status: Status) => void
  setRole: (role: Role) => void
  clearAccount: () => void
}

const useAccountStore = create<AccountState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set, get) => ({
          status: null,
          role: USER_ROLE.guest,
          isComplete: () =>
            get().status !== 'incomplete' && get().status !== null,
          isVerified: () => get().status !== 'pending' && get().status !== null,
          updateStatus: () => {
            const status = get().role === 'admin' ? 'active' : 'pending'
            set(() => ({ status }))
          },
          setStatus: (status: Status) => set(() => ({ status })),
          setRole: (role: Role) => set(() => ({ role })),
          clearAccount: () => {
            set(() => ({
              status: null,
              role: USER_ROLE.guest,
            }))
          },
        }))
      ),
      { name: 'account-storage' }
    )
  )
)

export default useAccountStore
