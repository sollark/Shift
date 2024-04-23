import { config } from '@/config/config'
import { LANGUAGES } from '@/constants/constants'
import { log } from '@/service/console.service'
import { FC, ReactNode, createContext, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from './AppThemeProvider'

const DEFAULT_LANGUAGE = config.defaultLanguage

type LanguageProviderProps = {
  children: ReactNode
}

export type LanguageContextType = {
  languageCode: string
  changeLanguage: (languageCode: string) => void
}

export const LanguageContext = createContext<LanguageContextType | null>(null)

const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error('LanguageProvider must be used within a AppThemeProvider')
  }
  const { languageCode, setLanguageCode } = themeContext

  if (!languageCode) {
    throw new Error('LanguageProvider must be used within a AppThemeProvider')
  }

  const { i18n } = useTranslation()
  const { t } = useTranslation()

  useEffect(() => {
    const storedLanguageCode = localStorage.getItem('languageCode')
    const initialLanguageCode = storedLanguageCode || DEFAULT_LANGUAGE

    if (LANGUAGES.some((lang) => lang.value === initialLanguageCode)) {
      setLanguageCode(initialLanguageCode)
    } else {
      setLanguageCode(LANGUAGES[0].value)
    }
  }, [])

  const changeLanguage = (newLanguageCode: string) => {
    if (LANGUAGES.some((lang) => lang.value === newLanguageCode)) {
      log('Setting language ...')
      setLanguageCode(newLanguageCode)
      localStorage.setItem('languageCode', newLanguageCode)
      i18n.changeLanguage(newLanguageCode)
    } else {
      throw new Error(`Invalid language code: ${newLanguageCode}`)
    }
  }

  useEffect(() => {
    document.body.dir = t('direction')
    document.documentElement.style.fontSize =
      languageCode === 'he' ? '16px' : '14px'
  }, [t, languageCode])

  return (
    <LanguageContext.Provider value={{ languageCode, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
