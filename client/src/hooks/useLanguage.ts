import { LanguageContext, LanguageContextType } from '@/Providers'
import { config } from '@/config/config'
import { LANGUAGES } from '@/constants/constants'
import { i18n } from '@/i18n/config'
import { useContext, useEffect, useState } from 'react'

const DEFAULT_LANGUAGE = config.defaultLanguage

export const useLanguage = (): [string, (newLanguageCode: string) => void] => {
  const languageContext = useContext(LanguageContext) as LanguageContextType

  const initialLanguageCode =
    LANGUAGES.find((lang) => lang.value === DEFAULT_LANGUAGE)?.value ||
    LANGUAGES[0].value

  const [currentLanguageCode, setCurrentLanguageCode] =
    useState<string>(initialLanguageCode)

  useEffect(() => {
    const storedLanguageCode = localStorage.getItem('languageCode')
    storedLanguageCode && setCurrentLanguageCode(storedLanguageCode)
  }, [])

  const setLanguage = (newLanguageCode: string) => {
    setCurrentLanguageCode(newLanguageCode)
    localStorage.setItem('languageCode', newLanguageCode)
    languageContext.setLanguage(newLanguageCode)
    i18n.changeLanguage(newLanguageCode)
  }

  return [currentLanguageCode, setLanguage]
}
