import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type AuthState = {
  isAuthenticated: boolean
  setAsAuthenticated: () => void
  setAsUnauthenticated: () => void
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

// TODO split this store into two stores: authStore and tokenStore
// Create a store with initial state
const useAuthStore = create<AuthState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          isAuthenticated: false,
          setAsAuthenticated: () => set(() => ({ isAuthenticated: true })),
          setAsUnauthenticated: () => set(() => ({ isAuthenticated: false })),
          token: null,
          setToken: (token) => set(() => ({ token })),
          clearToken: () => set(() => ({ token: null })),
        }))
      ),
      { name: 'auth-storage' }
    )
  )
)

export default useAuthStore
