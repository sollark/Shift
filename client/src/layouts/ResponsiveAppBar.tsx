import Logo from '@/components/Logo'
import MobileNavigation from '@/components/menu/MobileNavigation'
import SiteNavigation from '@/components/menu/SiteNavigation'
import User from '@/components/user/User'
import { log } from '@/service/console.service'
import LanguageSwitcher from '@/ui/languageSwitcher/LanguageSwitcher'
import ThemeSwitcher from '@/ui/themeSwitcher/ThemeSwitcher'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { FC } from 'react'

const ResponsiveAppBar: FC = () => {
  log('ResponsiveAppBar is connected')

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Logo for medium and larger screens (md)*/}
          <Logo sxLogo={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* Mobile menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MobileNavigation />
          </Box>
          {/* Logo for mobile */}
          <Logo
            sxLogo={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, mr: 1 }}
          />
          {/* Site navigation for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <SiteNavigation />
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
