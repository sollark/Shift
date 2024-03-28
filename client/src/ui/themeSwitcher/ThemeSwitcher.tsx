import { ColorModeContext, ColorModeContextType } from '@/Providers'
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useContext } from 'react'

const ThemeSwitcher = () => {
  const { mode, toggleColorMode } = useContext(
    ColorModeContext
  ) as ColorModeContextType
  const isDarkMode = mode === 'dark'

  const handleThemeChange = () => {
    toggleColorMode()
  }

  return (
    <IconButton color='inherit' onClick={handleThemeChange}>
      {isDarkMode ? <LightIcon /> : <DarkIcon />}
    </IconButton>
  )
}

export default ThemeSwitcher
