import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type AuthState = {
  token: string | null
}

type AuthActions = {
  setToken: (token: string) => void
  clearToken: () => void
}

// TODO split this store into two stores: authStore and tokenStore
// Create a store with initial state
const useAuthStore = create<AuthState & AuthActions>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
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

/*
 Use selector in components:
 const isAuthenticated = useAuthStore(authSelectors.isAuthenticated)
 
 Use selector in function:
 const isAuthenticated = authSelectors.isAuthenticated(useAuthStore.getState());
*/
export const authSelectors = {
  isAuthenticated: (state: AuthState) => state.token !== null,
}
