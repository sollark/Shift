export {}

// define custom colors: https://material-ui.com/customization/palette/
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    accent: Palette['primary']
    // accent: PaletteColor
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary']
    // accent: SimplePaletteColorOptions
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
