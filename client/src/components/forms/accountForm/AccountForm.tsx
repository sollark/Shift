import { ProfileSchema } from '@/models/Profile'
import { accountService } from '@/service/account.service'
import { log } from '@/service/console.service'
import useAccountStore, { accountSelector } from '@/stores/accountStore'
import useUserStore from '@/stores/userStore'
import { useNavigate } from '@tanstack/react-router'
import { FC, ReactElement } from 'react'
import { z } from 'zod'
import MultistepForm from '../MultistepForm'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountSchema = z.object({}).merge(ProfileSchema)

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props
  const navigate = useNavigate()

  const profile = useUserStore((state) => state.profile)

  const defaultValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    ID: profile?.ID || '',
  }

  async function submit(form: any) {
    log('Account form submitted: ', form)

    const account = await accountService.updateAccount(
      form.firstName,
      form.lastName,
      form.ID
    )

    log('AccountForm, account: ', account)

    if (accountSelector.isComplete(useAccountStore.getState()))
      navigate({ to: '/' })
  }

  return (
    <MultistepForm
      schema={AccountSchema}
      defaultValues={defaultValues}
      submit={submit}>
      {children}
    </MultistepForm>
  )
}

export default AccountForm
