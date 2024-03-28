import { LanguageContext, LanguageContextType } from '@/Providers'
import { LANGUAGES } from '@/constants/constants'
import { ChangeEvent, FC, useContext } from 'react'

const LanguageSwitcher: FC = () => {
  const { currentLanguageCode, setLanguage } = useContext(
    LanguageContext
  ) as LanguageContextType

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value)
  }

  return (
    <div style={{ padding: '5px' }}>
      <select value={currentLanguageCode} onChange={handleLanguageChange}>
        {LANGUAGES.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSwitcher
