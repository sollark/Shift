import { Link } from '@tanstack/react-router'
import i18next from 'i18next'

export function getGuestNavigationLinks() {
  return [{ key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> }]
}

export function getUserNavigationLinks() {
  return [
    { key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> },
    {
      key: 'Account',
      link: <Link to='/account/details'>{i18next.t('pages.profile')}</Link>,
    },
  ]
}

export function getAdminNavigationLinks() {
  return [
    { key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> },
    {
      key: 'Account',
      link: <Link to='/account/details'>{i18next.t('pages.profile')}</Link>,
    },
  ]
}
