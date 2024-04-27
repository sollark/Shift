import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

// UnauthorizedPage
// User is logged in and authenticated
// But does not have permission to access this specific resource

const UnauthorizedPage: FC = () => {
  log('UnauthorizedPage connected')

  const { t } = useTranslation()

  return (
    <Box
      sx={{
        m: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '100vh',
        maxWidth: ['100%', '100%', '100%', '75%', '75%'],
        backgroundColor: 'primary.light',
      }}>
      <h1>{t('pages.titles.not_auth')}</h1>
    </Box>
  )
}

export default UnauthorizedPage
