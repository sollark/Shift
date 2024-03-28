import { Link } from '@tanstack/react-router'
import i18next from 'i18next'

export function getUserPages() {
  return [
    { key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> },
    {
      key: 'Company',
      link: <Link to='/company'>{i18next.t('pages.company')}</Link>,
    },
    {
      key: 'Employees',
      link: <Link to='/employeeList'>{i18next.t('pages.employees')}</Link>,
    },
  ]
}

export function getAdminPages() {
  return [
    { key: 'Home', link: <Link to='/'>{i18next.t('pages.home')}</Link> },
    {
      key: 'Company',
      link: <Link to='/company'>{i18next.t('pages.company')}</Link>,
    },
    {
      key: 'Employees',
      link: <Link to='/employeeList'>{i18next.t('pages.employees')}</Link>,
    },
    {
      key: 'Accounts',
      link: <Link to='/accountList'>{i18next.t('pages.accounts')}</Link>,
    },
  ]
}
