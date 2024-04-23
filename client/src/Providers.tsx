import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from './hooks/useLanguage'
import ColorModeProvider from './providers/ColorModeProvider'
import LanguageProvider from './providers/LanguageProvider'
import MuiThemeProvider from './providers/MuiThemeProvider'
import NotificationsProvider from './providers/NotificationsProvider'
import { log } from './service/console.service'

// All application has access to the same query client to share data
const queryClient = new QueryClient({
  defaultOptions: {
    // All queries will be refetched every 5 minutes
    //queries: { staleTime: 1000 * 60 * 5 },
  },
})

export const Providers = ({ children }: { children: React.ReactNode }) => {
  log('Providers connected')

  // Hebrew, Russian , English
  const [languageCode] = useLanguage()
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
      <ColorModeProvider>
        <LanguageProvider>
          <MuiThemeProvider>
            <NotificationsProvider>{children}</NotificationsProvider>
          </MuiThemeProvider>
        </LanguageProvider>
      </ColorModeProvider>
    </QueryClientProvider>
  )
}
