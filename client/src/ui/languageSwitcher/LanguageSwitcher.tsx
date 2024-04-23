import { LANGUAGES } from '@/constants/constants'
import { LanguageContext } from '@/providers/LanguageProvider'
import { ChangeEvent, FC, useContext } from 'react'

const LanguageSwitcher: FC = () => {
  const languageContext = useContext(LanguageContext)
  if (!languageContext) {
    throw new Error('LanguageSwitcher must be used within a AppThemeProvider')
  }
  const { languageCode, changeLanguage } = languageContext

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value)
  }

  return (
    <div style={{ padding: '5px', alignSelf: 'center' }}>
      <select value={languageCode} onChange={handleLanguageChange}>
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
