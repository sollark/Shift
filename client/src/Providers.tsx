import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import React, { createContext, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from './hooks/useLanguage'
import useThemeMode from './hooks/useThemeMode'
import { log } from './service/console.service'
import { getDesignTokens } from './theme/theme'
import LanguageProvider from './providers/LanguageProvider'

export type ColorModeContextType = {
  mode: string
  toggleThemeMode: () => void
}

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
  const [mode, toggleThemeMode] = useThemeMode()

  // Hebrew, Russian , English
  const [languageCode, setLanguageCode] = useLanguage()

  // Theme
  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, languageCode)),
    [mode, languageCode]
  )
  const { i18n } = useTranslation()

  // Text direction
  useEffect(() => {
    // Set text direction
    document.body.dir = i18n.dir()

    // Set font size based on language
    document.documentElement.style.fontSize =
      languageCode === 'he' ? '16px' : '14px'
  }, [i18n, languageCode])

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={{ mode, toggleThemeMode }}>
        <LanguageProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  )
}
