import AccountForm from '@/cmps/forms/accountForm/AccountForm'
import CompanyDetailsFields from '@/cmps/forms/accountForm/CompanyDetailsFields'
import UserDetailsFields from '@/cmps/forms/accountForm/UserDetailsFields'
import CustomLink from '@/cmps/link/CustomLink'
import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'

const AccountEditPage: FC = () => {
  log('AccountEdit connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <AccountForm>
        <UserDetailsFields />
        <CompanyDetailsFields />
      </AccountForm>
      <p>
        Want to join your company?{' '}
        <CustomLink to='/account/join'>Join a company</CustomLink>
      </p>
    </Box>
  )
}

export default AccountEditPage
