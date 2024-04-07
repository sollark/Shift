import { authService } from '@/service/auth.service'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function getUserMenu() {
  const { t } = useTranslation()

  return [
    {
      key: 'Account',
      link: <Link to='/account/details'>{t('account_menu.account')}</Link>,
    },
    {
      key: 'SignOut',
      link: (
        <Link onClick={() => authService.signOut()} to='/signin'>
          {t('auth.sign_out')}
        </Link>
      ),
    },
  ]
}

export function getGuestMenu() {
  return [
    {
      key: 'SignIn',
      link: <Link to='/signin'>Sign in</Link>,
    },
  ]
}
