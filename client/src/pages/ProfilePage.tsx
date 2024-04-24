import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const ProfilePage: FC = () => {
  log('ProfilePage connected')

  const { t } = useTranslation()
  // const profile = useProfileStore((state) => state.profile)

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>{t('pages.profile')}</h1>{' '}
      {/* <p>First Name: {profile?.firstName}</p>
        <p>Last Name: {profile?.lastName}</p>
        <p>ID: {profile?.ID}</p> */}
    </Box>
  )
}

export default ProfilePage
