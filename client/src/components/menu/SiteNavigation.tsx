import { useNavigationMenu } from '@/hooks/useNavigationMenu'
import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import { Button } from '@mui/material'
import { FC } from 'react'

type SiteNavigationProps = {
  handleCloseNavMenu: () => void
}

const SiteNavigation: FC<SiteNavigationProps> = (props) => {
  const { handleCloseNavMenu } = props
  const role: Role = useAccountStore((state) => state.role)
  const pages = useNavigationMenu(role)

  return (
    <>
      {pages.map((page) => (
        <Button
          key={page.key}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'primary.contrastText', display: 'block' }}>
          {page.link}
        </Button>
      ))}
    </>
  )
}

export default SiteNavigation
