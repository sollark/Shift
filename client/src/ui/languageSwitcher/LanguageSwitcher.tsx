import { LANGUAGES } from '@/constants/constants'
import {
  LanguageContext,
  LanguageContextType,
} from '@/providers/LanguageProvider'
import { ChangeEvent, FC, useContext } from 'react'

const LanguageSwitcher: FC = () => {
  const { languageCode, setLanguageCode } = useContext(
    LanguageContext
  ) as LanguageContextType

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
