import { log } from '@/service/console.service'
import CustomLink from '@/ui/link/CustomLink'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import RegistrationForm from '../components/forms/RegistrationForm'

const RegistrationPage: FC = () => {
  log('RegistrationPage connected')

  const { t } = useTranslation()

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>{t('pages.registration')}</h1>
      <RegistrationForm />
      <p>
        {t('registration_page.Already have an account?')}{' '}
        <CustomLink to='/signin'>{t('auth.sign_in')}</CustomLink>
      </p>
    </Box>
  )
}

export default RegistrationPage
