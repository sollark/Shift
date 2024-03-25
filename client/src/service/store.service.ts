import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useCompanyStore from '@/stores/companyStore'
import { default as useEmployeeStore } from '@/stores/employeeStore'
import useProfileStore from '@/stores/userStore'
import { log } from './console.service'

function saveAccount(account: Account) {
  log('storeService - saveAccount, account :', account)

  const { profile, employee, role, status } = account

  useAccountStore.getState().setStatus(status)
  useAccountStore.getState().setRole(role)
  useProfileStore.getState().setProfile(profile)

  if (employee) {
    log('storeService - saveAccount, employee :', employee)

    const { company } = employee

    useCompanyStore.getState().setCompany(company)
    useEmployeeStore.getState().setEmployee(employee)
  }
}

function saveAccessToken(accessToken: string) {
  useAuthStore.getState().setToken(accessToken)
}

function setProfileAsAuthenticated() {
  useAuthStore.getState().setAsAuthenticated()
}

function setProfileAsUnauthenticated() {
  useAuthStore.getState().setAsUnauthenticated()
}

function clearStoreStates() {
  log('clearStoreStates()')

  useAccountStore.getState().clearAccount()
  useProfileStore.getState().clearProfile()
  useCompanyStore.getState().clearCompany()
  useEmployeeStore.getState().clearEmployee()
  useAuthStore.getState().clearToken()
  useAuthStore.getState().setAsUnauthenticated()
}

export const storeService = {
  saveAccount,
  saveAccessToken,
  setProfileAsAuthenticated,
  setProfileAsUnauthenticated,
  clearStoreStates,
}
