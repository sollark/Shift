import { Box } from '@mui/material'
import { log } from 'console'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const ProfilePage: FC = () => {
  log('ProfilePage connected')

  const { t } = useTranslation()

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>{t('pages.profile')}</h1>
    </Box>
  )
}

export default ProfilePage
