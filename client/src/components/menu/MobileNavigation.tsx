import { useNavigationMenu } from '@/hooks/useNavigationMenu'
import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import { Menu, MenuItem, Typography } from '@mui/material'
import { FC } from 'react'

type MobileNavigationProps = {
  anchorElNav: null | HTMLElement
  handleCloseNavMenu: () => void
}

const MobileNavigation: FC<MobileNavigationProps> = (props) => {
  const { anchorElNav, handleCloseNavMenu } = props
  const role: Role = useAccountStore((state) => state.role)
  const pages = useNavigationMenu(role)

  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}>
      {pages.map((page) => (
        <MenuItem key={page.key} onClick={handleCloseNavMenu}>
          <Typography textAlign='center'>{page.link}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default MobileNavigation
