export {}

declare module '@material-ui/core/styles' {
  interface PaletteOptions {
    neutral?: PaletteColorOptions
  }
  interface Palette {
    neutral?: PaletteColor
  }
}

type PaletteColorOptions = {
  dark?: string
  main?: string
  light?: string
}

type PaletteColor = {
  dark: string
  main: string
  light: string
}
