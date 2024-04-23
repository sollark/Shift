import { PaletteMode } from '@mui/material'
import { FC, ReactNode, createContext, useState } from 'react'

type AppThemeProviderProps = {
  children: ReactNode
}

export type ThemeContextType = {
  mode: PaletteMode
  setMode: (newThemeMode: PaletteMode) => void
  toggleThemeMode: () => void
  languageCode: string
  setLanguageCode: (newLanguageCode: string) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [languageCode, setLanguageCode] = useState<string>('en')

  function toggleThemeMode() {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      return newMode
    })
  }

  return (
    <ThemeContext.Provider
      value={{ mode, setMode, toggleThemeMode, languageCode, setLanguageCode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { AppThemeProvider }
