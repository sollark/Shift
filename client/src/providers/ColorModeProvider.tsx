import useThemeMode from '@/hooks/useThemeMode'
import { PaletteMode } from '@mui/material'
import { FC, ReactNode, createContext, useMemo } from 'react'

type ColorModeProviderProps = {
  children: ReactNode
}

export type ColorModeContextType = {
  mode: PaletteMode
  toggleThemeMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextType | null>(null)

const ColorModeProvider: FC<ColorModeProviderProps> = ({ children }) => {
  const [mode, toggleThemeMode] = useThemeMode()

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
