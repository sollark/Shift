import { log } from '@/service/console.service'
import { getDesignTokens } from '@/theme/theme'
import { PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material'
import { Theme, createTheme } from '@mui/material/styles'
import { FC, ReactNode, useContext, useEffect, useMemo } from 'react'
import { ThemeContext } from './AppThemeProvider'

type AppTheme = Theme

type ThemeModeProviderProps = {
  children: ReactNode
}

const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error('ThemeModeProvider must be used within a AppThemeProvider')
  }
  const { mode, setMode, languageCode } = themeContext

  const prefersDarkMode =
    useMediaQuery('(prefers-color-scheme: dark)') ||
    localStorage.getItem('theme') === 'dark'

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode, setMode])

  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  const theme = useMemo<AppTheme>(
    () => createAppTheme(mode, languageCode),
    [mode, languageCode]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const createAppTheme = (mode: PaletteMode, languageCode: string): AppTheme => {
  log('Creating a new theme ...')
  return createTheme(getDesignTokens(mode, languageCode))
}

export default ThemeModeProvider
