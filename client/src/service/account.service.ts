import { Account } from '@/models/Account'
import { httpService } from './axios/http.service'
import { log } from './console.service'
import { storeService } from './store.service'

type AccountData = {
  account: Account
}

async function updateAccount(
  firstName: string,
  lastName: string,
  ID: string,
  companyName: string,
  departmentName: string,
  position: string
) {
  const response = await httpService.post<AccountData>('account/update', {
    firstName,
    lastName,
    ID,
    companyName,
    departmentName,
    position,
  })

  log('accountService - updateAccount, response', response)
  if (response && response.success) {
    const { account } = response.data
    storeService.saveAccount(account)

    return account
  }
  return null
}

async function getAccount(): Promise<Account | null> {
  const response = await httpService.get<AccountData>('account')

  log('accountService - getAccount, response', response)

  if (response && response.success) {
    const { account } = response.data
    storeService.saveAccount(account)

    return account
  }

  return null
}

export const accountService = { updateAccount, getAccount }
