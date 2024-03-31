import { Link } from '@tanstack/react-router'
import i18next from 'i18next'

export function getUserPages() {
  return [{ key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> }]
}

export function getAdminPages() {
  return [{ key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> }]
}
