import { useLanguage } from '@/hooks/useLanguage'
import useThemeMode from '@/hooks/useThemeMode'
import { getDesignTokens } from '@/theme/theme'
import { PaletteMode, ThemeProvider } from '@mui/material'
import { Theme, createTheme } from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'

type AppTheme = Theme

interface Props {
  children: ReactNode
}

const MuiThemeProvider = ({ children }: Props) => {
  const [mode] = useThemeMode()
  const [languageCode] = useLanguage()

  const theme = useMemo<AppTheme>(
    () => createAppTheme(mode, languageCode),
    [mode, languageCode]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const createAppTheme = (mode: PaletteMode, languageCode: string): AppTheme => {
  return createTheme(getDesignTokens(mode, languageCode))
}

export default MuiThemeProvider
