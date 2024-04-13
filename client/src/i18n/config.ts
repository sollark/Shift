import { config } from '@/config/config'
import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18next
  .use(HttpBackend) // Optional for dynamic loading
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // Pass options to initReactI18next
  .init<HttpBackendOptions>({
    backend: {
      // files are loaded from vite server public folder
      loadPath: '/i18n/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: localStorage.getItem('languageCode') || config.defaultLanguage,
    defaultNS: 'translation',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    debug: true, // Enable debug logging (optional)
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
  })

export const i18n = i18next

// Usage
// In component
// const {t} = useTranslation()
// t('key') // returns the translation
//
// In function
// const translation = i18next.t('key')
