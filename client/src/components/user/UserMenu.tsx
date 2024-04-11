import { authService } from '@/service/auth.service'
import { Link } from '@tanstack/react-router'
import i18next from 'i18next'

export function getUserMenu() {
  return [
    {
      key: 'Profile',
      link: (
        <Link to='/profile/details'>{i18next.t('account_menu.profile')}</Link>
      ),
    },
    {
      key: 'Account',
      link: (
        <Link to='/account/details'>{i18next.t('account_menu.account')}</Link>
      ),
    },
    {
      key: 'Settings',
      link: <Link to='/settings'>{i18next.t('auth.settings')}</Link>,
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
    {
      key: 'Settings',
      link: <Link to='/settings'>{i18next.t('auth.settings')}</Link>,
    },
  ]
}