import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import React, { createContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from './hooks/useLanguage'
import useThemeMode from './hooks/useThemeMode'
import { log } from './service/console.service'
import { getDesignTokens } from './theme/theme'

export type LanguageContextType = {
  currentLanguageCode: string
  setLanguage: (languageCode: string) => void
}

export type ColorModeContextType = {
  mode: string
  toggleColorMode: () => void
}

export const LanguageContext = createContext<LanguageContextType | null>(null)
export const ColorModeContext = createContext<ColorModeContextType | null>(null)

// All application has access to the same query client to share data
const queryClient = new QueryClient({
  defaultOptions: {
    // All queries will be refetched every 5 minutes
    //queries: { staleTime: 1000 * 60 * 5 },
  },
})

export const Providers = ({ children }: { children: React.ReactNode }) => {
  log('Providers connected')

  // Light / Dark
  const [mode, toggleColorMode] = useThemeMode()

  // Hebrew, Russian , English
  const [currentLanguageCode, setLanguage] = useLanguage()

  // Theme
  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, currentLanguageCode)),
    [mode, currentLanguageCode]
  )
  // Text direction
  const { i18n } = useTranslation()
  document.body.dir = i18n.dir()

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
        <LanguageContext.Provider value={{ currentLanguageCode, setLanguage }}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  )
}
