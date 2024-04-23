import { LANGUAGES } from '@/constants/constants'
import { ThemeContext } from '@/providers/AppThemeProvider'
import { ChangeEvent, FC, useContext } from 'react'

const LanguageSwitcher: FC = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error('LanguageSwitcher must be used within a AppThemeProvider')
  }
  const { languageCode, setLanguageCode } = themeContext

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguageCode(event.target.value)
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
