import { log } from '@/service/console.service.js'
import { tokens } from './colorTokens'

type PaletteMode = 'light' | 'dark'

// Mui theme setting
export const getDesignTokens = (mode: PaletteMode, lang: string) => {
  log(`Mui theme, mode ${mode}, lang ${lang}`)

  const colors = tokens(mode)

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.primary[500],
              contrastText: colors.grey[100], // Add contrast text color
              divider: colors.grey[100], // Add divider color
            },
            secondary: {
              main: colors.secondary[800],
              contrastText: colors.grey[100], // Add contrast text color
            },
            accent: {
              dark: colors.accent[100],
              main: colors.accent[300],
              light: colors.accent[400],
              contrastText: colors.grey[800], // Add contrast text color
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[900],
              // paper: colors.grey[800],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
              contrastText: colors.grey[800], // Add contrast text color
              divider: colors.grey[100], // Add divider color
            },
            secondary: {
              main: colors.secondary[200],
              contrastText: colors.grey[800], // Add contrast text color
            },
            accent: {
              light: colors.accent[100],
              main: colors.accent[300],
              dark: colors.accent[500],
              contrastText: colors.grey[800], // Add contrast text color
            },
            neutral: {
              dark: colors.grey[100],
              main: colors.grey[500],
              light: colors.grey[700],
            },
            background: {
              default: colors.grey[100],
              // paper: colors.grey[200],
            },
          }),
    },
    typography: {
      fontFamily:
        lang === 'he'
          ? 'Noto, Helvetica, Arial, sans-serif'
          : 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: lang === 'he' ? 16 : 14,
    },
  }
}
