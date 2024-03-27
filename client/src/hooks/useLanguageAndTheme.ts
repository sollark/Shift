// useLanguageAndTheme.ts
import { ColorModeContext, LanguageContext } from '@/Providers'
import { config } from '@/config/config'
import { LANGUAGES } from '@/constants/constants'
import { i18n } from '@/i18n/config'
import { useContext, useEffect, useState } from 'react'

const DEFAULT_LANGUAGE = config.defaultLanguage

export const useLanguageAndTheme = () => {
  // const {
  //   currentLanguageCode: contextLanguageCode,
  //   setLanguage: setLanguageContext,
  // } = useContext(LanguageContext)
  const { mode, toggleColorMode } = useContext(ColorModeContext)

  return { mode, toggleColorMode }
}
