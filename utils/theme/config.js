import {createTheme} from '@mui/material'

const themeOptions = {
    palette: {
      primary: {
        main: '#3f50b5'
      },
      secondary: {
        main: '#f44336'
      },
    },
  };

const theme = createTheme(themeOptions)
export {theme}