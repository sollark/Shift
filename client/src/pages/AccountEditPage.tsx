import AccountForm from '@/components/forms/accountForm/AccountForm'
import UserDetailsFields from '@/components/forms/accountForm/UserDetailsFields'
import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'

const AccountEditPage: FC = () => {
  log('AccountEditPage connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <AccountForm>
        <UserDetailsFields />
        <></>
      </AccountForm>
    </Box>
  )
}

export default AccountEditPage
