import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const AccountPage: FC = () => {
  log('AccountPage connected')

  const { t } = useTranslation()
  // const profile = useProfileStore((state) => state.profile)

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>{t('pages.account')}</h1>
      <div>
        <h2>Profile</h2>
        {/* <p>First Name: {profile?.firstName}</p>
        <p>Last Name: {profile?.lastName}</p>
        <p>ID: {profile?.ID}</p> */}
      </div>
    </Box>
  )
}

export default AccountPage
