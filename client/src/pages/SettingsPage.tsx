import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const SettingsPage: FC = () => {
  log('SettingsPage connected')

  const { t } = useTranslation()

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>{t('pages.settings')}</h1>
    </Box>
  )
}

export default SettingsPage
