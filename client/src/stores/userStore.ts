import { Profile } from '@/models/Profile'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type UserState = {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  clearProfile: () => void
}

// Create a store with initial state
const useUserStore = create<UserState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          profile: null,
          setProfile: (profile) => set(() => ({ profile })),
          clearProfile: () => set(() => ({ profile: null })),
        }))
      ),
      { name: 'user-storage' }
    )
  )
)

export default useUserStore

// getter:
// const { profile } = useProfileStore()
// const  profile = useProfileStore(state => state.profile) // this is optimal and not cause rerender when other state properties change
// const firstName = profile?.firstName

// setter
// useProfileStore.setState({ profile: account.profile })

// run function
// useProfileStore.getState().setProfile(account.profile)

// doesn't work in function (hooks rules)
// const setAccountAsComplete = useAccountStore(
//   (state) => state.setAccountAsComplete
// )

// works in function
// useAccountStore.getState().setAccountAsComplete()
