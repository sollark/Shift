import CustomLink from '@/cmps/link/CustomLink'
import TestSignIn from '@/cmps/oneClickSignIn/OneClickSignIn'
import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'
import SignInForm from '../cmps/forms/SignInForm'
import { useTranslation } from 'react-i18next'

const SigninPage: FC = () => {
  log('SigninPage connected')

  const { t } = useTranslation()

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>{t('pages.sign_in')}</h1>
      <SignInForm />
      <p>
        {t("sign_in_page.Don't have an account?")}{' '}
        <CustomLink to='/registration'>{t('auth.registration')}</CustomLink>
      </p>
      <TestSignIn />
    </Box>
  )
}

export default SigninPage
