import {createTheme} from '@mui/material'

const themeOptions = {
    palette: {
      primary: {
        light: '#ab47bc',
        main: '#9c27b0',
        dark: '#8e24aa',
        contrastText: '#fff',
      },
      secondary: {
        light: '#bdbdbd',
        main: '#9e9e9e',
        dark: '#757575',
        contrastText: '#000',
      },
    },
  };

const theme = createTheme(themeOptions)
export {theme}