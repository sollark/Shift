import { authService } from '@/service/auth.service'
import { Link } from '@tanstack/react-router'
import i18next from 'i18next'

export function getUserMenu() {
  return [
    {
      key: 'Account',
      link: (
        <Link to='/account/details'>{i18next.t('account_menu.account')}</Link>
      ),
    },
    {
      key: 'SignOut',
      link: (
        <Link onClick={() => authService.signOut()} to='/signin'>
          {i18next.t('auth.sign_out')}
        </Link>
      ),
    },
  ]
}

export function getGuestMenu() {
  return [
    {
      key: 'SignIn',
      link: <Link to='/signin'>{i18next.t('auth.sign_in')}</Link>,
    },
  ]
}
