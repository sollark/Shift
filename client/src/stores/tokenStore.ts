import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type TokenState = {
  token: string | null
}

type TokenActions = {
  setToken: (token: string) => void
  clearToken: () => void
}

// Create a store with initial state
const useTokenStore = create<TokenState & TokenActions>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          token: null,
          setToken: (token) => set(() => ({ token })),
          clearToken: () => set(() => ({ token: null })),
        }))
      ),
      { name: 'token-storage' }
    )
  )
)

export default useTokenStore

/*
 Use selector in components:
 const isAuthenticated = useTokenStore(tokenSelectors.isAuthenticated)
 
 Use selector in function:
 const isAuthenticated = tokenSelectors.isAuthenticated(useTokenStore.getState());
*/
export const tokenSelectors = {
  isAuthenticated: (state: TokenState) => state.token !== null,
}
