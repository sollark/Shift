import { Link } from '@tanstack/react-router'
import i18next from 'i18next'

export function getGuestNavigationLinks() {
  return [
    { key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> },
    { key: 'About', link: <Link to='/about'>{i18next.t('pages.about')}</Link> },
  ]
}

export function getUserNavigationLinks() {
  return [
    { key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> },
    { key: 'About', link: <Link to='/about'>{i18next.t('pages.about')}</Link> },
    {
      key: 'Account',
      link: <Link to='/account'>{i18next.t('pages.account')}</Link>,
    },
  ]
}

export function getAdminNavigationLinks() {
  return [
    { key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> },
    { key: 'About', link: <Link to='/about'>{i18next.t('pages.about')}</Link> },
    {
      key: 'Account',
      link: <Link to='/account'>{i18next.t('pages.account')}</Link>,
    },
  ]
}
