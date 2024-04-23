import { PaletteMode } from '@mui/material'
import { FC, ReactNode, createContext, useContext, useMemo } from 'react'
import { ThemeContext } from './AppThemeProvider'

type ColorModeProviderProps = {
  children: ReactNode
}

export type ColorModeContextType = {
  mode: PaletteMode
  toggleThemeMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextType | null>(null)

const ColorModeProvider: FC<ColorModeProviderProps> = ({ children }) => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error('ColorModeProvider must be used within a AppThemeProvider')
  }
  const { mode, toggleThemeMode } = themeContext

  const value = useMemo(
    () => ({
      mode,
      toggleThemeMode,
    }),
    [mode, toggleThemeMode]
  )

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  )
}

export default ColorModeProvider
