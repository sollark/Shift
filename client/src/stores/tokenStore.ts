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
 const token = useTokenStore(tokenSelectors.getToken)
 
 Use selector in function:
 const token = tokenSelectors.getToken(useTokenStore.getState());
*/

export const tokenSelectors = {
  getToken: (state: TokenState) => {
    return state.token
  },
}
