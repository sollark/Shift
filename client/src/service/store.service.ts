import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useProfileStore from '@/stores/userStore'
import { log } from './console.service'

function saveAccount(account: Account) {
  log('storeService - saveAccount(), account :', account)

  const { profile, role, status } = account

  useAccountStore.getState().setStatus(status)
  useAccountStore.getState().setRole(role)
  useProfileStore.getState().setProfile(profile)
}

function saveAccessToken(accessToken: string) {
  useAuthStore.getState().setToken(accessToken)
}

function clearStoreStates() {
  log('storeService - clearStoreStates()')

  useAccountStore.getState().clearAccount()
  useProfileStore.getState().clearProfile()
  useAuthStore.getState().clearToken()
}

export const storeService = {
  saveAccount,
  saveAccessToken,
  clearStoreStates,
}
