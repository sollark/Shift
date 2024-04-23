import { useLanguage } from '@/hooks/useLanguage'
import { FC, ReactNode, createContext } from 'react'

type LanguageProviderProps = {
  children: ReactNode
}

type LanguageContextType = {
  languageCode: string
  setLanguageCode: (languageCode: string) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [languageCode, setLanguageCode] = useLanguage()

  return (
    <LanguageContext.Provider value={{ languageCode, setLanguageCode }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
