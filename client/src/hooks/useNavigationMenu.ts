import { getAdminPages, getUserPages } from '@/cmps/menu/Pages'
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
        navigationPages = getAdminPages()
        break
      case 'guest':
      case 'employee':
      case 'supervisor':
      default:
        navigationPages = getUserPages()
        break
    }

    setPages(navigationPages)
  }, [role, i18n.language])

  return pages
}
multilanguage
