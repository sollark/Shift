import Logo from '@/components/Logo'
import User from '@/components/user/User'
import LanguageSwitcher from '@/ui/languageSwitcher/LanguageSwitcher'
import ThemeSwitcher from '@/ui/themeSwitcher/ThemeSwitcher'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC, MouseEvent, useState } from 'react'

const ResponsiveAppBar: FC = () => {
  const pages = ['Products', 'Pricing', 'Blog']

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu: () => void = () => {
    setAnchorElNav(null)
  }
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Logo for medium and larger screens (md)*/}
          <Logo sxLogo={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* Mobile menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Logo for mobile */}
          <Logo
            sxLogo={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, mr: 1 }}
          />
          {/* Site navigation for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
          {/* User menu and settings */}
          <Box sx={{ display: 'flex', flexGrow: 0 }}>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <User />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
