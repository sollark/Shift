import { log } from '@/service/console.service'
import { useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

const useThemeMode = (): ['light' | 'dark', () => void] => {
  const prefersDarkMode =
    useMediaQuery('(prefers-color-scheme: dark)') ||
    localStorage.getItem('theme') === 'dark'

  const [mode, setMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  )

  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  const toggleThemeMode = useCallback(() => {
    log('toggleThemeMode')

    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newMode)

      return newMode
    })
  }, [])

  return [mode, toggleThemeMode]
}

export default useThemeMode
