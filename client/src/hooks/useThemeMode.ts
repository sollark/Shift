import { useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

const useThemeMode = (): ['light' | 'dark', () => void] => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' || prefersDarkMode
      ? 'dark'
      : 'light'
  )

  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  const toggleColorMode = useCallback(() => {
    console.log('toggleColorMode')
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newMode)

      return newMode
    })
  }, [])

  return [mode, toggleColorMode]
}

export default useThemeMode
