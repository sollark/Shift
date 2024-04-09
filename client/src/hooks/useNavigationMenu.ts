import {
  getAdminNavigationLinks,
  getGuestNavigationLinks,
  getUserNavigationLinks,
} from '@/components/menu/NavigationLinks'
import { Role } from '@/models/Account'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useNavigationMenu(role: Role) {
  const [pages, setPages] = useState<{ key: string; link: JSX.Element }[]>([])
  const { i18n } = useTranslation()

  useEffect(() => {
    let navigationPages

    switch (role) {
      case 'admin':
        navigationPages = getUserNavigationLinks()
        break
      case 'user':
        navigationPages = getAdminNavigationLinks()
        break
      case 'guest':
        navigationPages = getGuestNavigationLinks()
        break
      default:
        navigationPages = getGuestNavigationLinks()
        break
    }

    setPages(navigationPages)
  }, [role, i18n.language])

  return pages
}
