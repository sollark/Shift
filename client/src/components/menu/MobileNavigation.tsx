import { useNavigationMenu } from '@/hooks/useNavigationMenu'
import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { FC, MouseEvent, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

// type MobileNavigationProps = {
//   // anchorElNav: null | HTMLElement
//   handleCloseNavMenu: () => void
// }

const MobileNavigation: FC = () => {
  // const { handleCloseNavMenu } = props
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const role: Role = useAccountStore((state) => state.role)
  const pages = useNavigationMenu(role)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu: () => void = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenNavMenu}
        color='inherit'>
        <MenuIcon />
      </IconButton>
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
    </>
  )
}

export default MobileNavigation
