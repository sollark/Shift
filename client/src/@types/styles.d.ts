export {}

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

// define custom colors: https://material-ui.com/customization/palette/
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    accent: Palette['primary']
    neutral: PaletteColor
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary']
    neutral?: PaletteColorOptions
  }
  interface PaletteColor {
    divider?: string
  }
  interface SimplePaletteColorOptions {
    divider?: string
  }
}

// Extend color prop on components
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    accent: true
    neutral: true
  }
}
